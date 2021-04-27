'use strict'

const express = require('express')
const path = require('path')
const bluebird = require('bluebird')
const redis = bluebird.Promise.promisifyAll(require("redis"))
const moment = require('moment')

const port = process.env.PORT || 3005
const redis_url = process.env.REDIS_URL

// App
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const client = redis.createClient(redis_url)

client.on("error", (error) => {
  console.error(error)
})

app.get('/api', async (req, res) => {
    console.log('fetching from react app...')
    const result = {data: []}
    const data = await client.hgetallAsync('alqueva:cota')
    try {
        const entries = Object.entries(data)
        .sort((a, b) => moment(a[0], 'DD.MM.YYYY').isSameOrBefore(moment(b[0], 'DD.MM.YYYY')) ? -1 : 1)

        entries.forEach(e => {
            result.data.push({
                date: e[0],
                high: parseFloat(e[1])
            })
        })
        
        res.status(200).send(result)
    } catch(err) {
        console.log(err)
    }
})

if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'prod') {
    // Serve any static files
    app.use(express.static(path.join(__dirname, '..', 'frontend', 'build')))
        
    // Handle React routing, return all requests to React app
    app.get('*', function(req, res) {
        res.sendFile(path.join(__dirname, '..', 'frontend', 'build', 'index.html'))
    })
}

// create the server and listen on the specified port
app.listen(port, () => {
    console.log(`Running started and listening on port: ${port}`)
})