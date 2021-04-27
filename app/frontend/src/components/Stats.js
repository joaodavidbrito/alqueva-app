import React, {useEffect, useContext} from 'react'
import Table from 'react-bootstrap/Table'
import _ from 'lodash'

import AlquevaAppContext from '../context/AlquevaAppContext'

const Stats = () => {
    const {state, dispatch} = useContext(AlquevaAppContext)

    useEffect(() => {
        let aux = [...state.filteredData]
        aux.shift()

        const mn = Math.min(...aux.map((el) => el[1]))
        const minDate = aux.filter(el => el[1] === mn).map(el => el[0]).slice(-1).pop()
        const mx = Math.max(...aux.map((el) => el[1]))
        const maxDate = aux.filter(el => el[1] === mx).map(el => el[0]).slice(-1).pop()
        const av = _.mean([...aux.map((el) => el[1])]).toFixed(2) || "Error"

        dispatch({type: 'UPDATE_STATS', min: mn, max: mx, avg: av, minDate, maxDate})
    }, [state.filteredData])

    return (
        <div>
            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th>Mín.</th>
                        <th>Média</th>
                        <th>Máx.</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><span className={state.stats.min === state.actualValue ? 'alert alert-primary' : ''}>{state.stats.min}</span></td>
                        <td>{state.stats.avg}</td>
                        <td><span className={state.stats.max === state.actualValue ? 'alert alert-danger' : ''}>{state.stats.max}</span></td>
                    </tr>
                    <tr>
                        <td>{state.stats.minDate}</td>
                        <td>{' - '}</td>
                        <td>{state.stats.maxDate}</td>
                    </tr>
                </tbody>
            </Table>
        </div>
    )
}

export {Stats as default}