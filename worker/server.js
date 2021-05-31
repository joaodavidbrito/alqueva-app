'use strict'

const express = require('express')
const bluebird = require('bluebird')
const redis = bluebird.Promise.promisifyAll(require("redis"))
const axios = require('axios')
const cheerio = require('cheerio')
const moment = require('moment')
const cron = require('node-cron')
const {InfluxDB, Point} = require('@influxdata/influxdb-client')
const {hostname} = require('os')

// env variables
const port = process.env.PORT || 3003
const redis_url = process.env.REDIS_URL
const database_url = process.env.DATABASE_URL
const token = process.env.INFLUXDB_TOKEN
const org = process.env.INFLUXDB_ORG
const bucket = process.env.INFLUXDB_BUCKET
const firstUrl = process.env.FIRST_URL
const secondUrl = process.env.SECOND_URL

console.log('database url:', database_url)
const dbName = 'alqueva:cota'


// App
const app = express()

axios.defaults.withCredentials = true

const options = {
    headers: {
        'cookie': undefined
}}
    
const client = redis.createClient(redis_url)

client.on("error", (error) => {
    console.error(error)
})


const influx = new InfluxDB({url: database_url, token})
const writeApi = influx.getWriteApi(org, bucket, 'ms')
writeApi.useDefaultTags({location: 'prod'})

const parseHtml = (html) => {
    const data = []
    const newData = {data: []}
    const $ = cheerio.load(html)
    $('table table tr td.tbl_val').each((i, el) => {
        let value = el.children[0].data
        value = value.trim()
        if(value === '') {
            value = el.children[2].data.trim() // escape (vco) string
    }

    if(value.length > 6){
        value = moment(value, 'DD/MM/YYYY HH:mm').format('DD.MM.YYYY')
    }
    data.push(value)
    })
    for(let i = 0; i < data.length;){
        newData.data.push({
            date: data[i++],
            high: data[i++]
        })
    }
    return newData
} 

const fetchSite = async ({startDate = '08/02/2002', endDate = moment().format('DD/MM/YYYY')} = {}) => {

    let response = await axios.get(firstUrl, options.headers.cookie ? options : undefined)
    if(response.headers['set-cookie']){
        options.headers.cookie = response.headers['set-cookie'][0].split(';')[0]
        console.log('cookie:', options.headers.cookie)
    }
    response = await axios.get(secondUrl + `&tmin=${startDate}&tmax=${endDate}`, options.headers.cookie ? options : undefined)

    const siteData = parseHtml(response.data)
    // console.log(siteData.data)

    return siteData
}

const updateRedis = async (data) => {
    for(let el of data) {
        const redisItem = await client.hgetAsync(dbName, el.date)
        // console.log(redisItem)
        if(!redisItem) {
            console.log(`Attempting to insert element on redis: ${dbName}, ${el.date}, ${el.high}`)
            client.hset(dbName, el.date, el.high)
        }
    }
}

const updateDatabase = async (data) => {
    const influxPoints =  []

    data.forEach(d => {
        const timestamp = moment(d[0], 'DD.MM.YYYY').toDate()
        influxPoints.push(
            new Point('alqueva')
                .tag('alqueva', 'cotas')
                .floatField('high', d[1])
                .timestamp(timestamp)
        )
    })

    writeApi.writePoints(influxPoints)

    writeApi.flush()
    .then(() => {
        console.log('FINISHED')
    })
    .catch(e => {
        console.error(e)
        console.log('\\nFinished ERROR')
    })
}

const task = async () => {
    console.log('running a task periodically')

    const siteData = await fetchSite({})
    await updateRedis(siteData.data) // send the array only
    const redisData = await client.hgetallAsync(dbName)
    const entries = Object.entries(redisData)
    await updateDatabase(entries)
}

/*
# ┌────────────── second (optional)
# │ ┌──────────── minute
# │ │ ┌────────── hour
# │ │ │ ┌──────── day of month
# │ │ │ │ ┌────── month
# │ │ │ │ │ ┌──── day of week
# │ │ │ │ │ │
# │ │ │ │ │ │
# * * * * * *
*/
cron.schedule('* */4 * * *', task)
task()

// create the server and listen on the specified port
app.listen(port, () => {
    console.log(`Running started and listening on port: ${port}`)
})