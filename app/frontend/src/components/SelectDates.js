import React, {useEffect, useContext} from 'react'
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup'
import ToggleButton from 'react-bootstrap/ToggleButton'
import _ from 'lodash'
import moment from 'moment'

import AlquevaAppContext from '../context/AlquevaAppContext'

const SelectDates = () => {
    const {state, getFormatedData, dispatch} = useContext(AlquevaAppContext)

    useEffect(() => {
        const formatedData = getFormatedData(state.waterData, { startDate: state.startDate, endDate: state.endDate })
        dispatch({type: 'SET_FILTERED_DATA', formatedData})

    }, [state.startDate, state.endDate])

    const handleDates = (value) => {
        dispatch({type: 'SET_TOGGLE_START', button: value})
        switch (value) {
            case "1m":
                dispatch({type: 'SET_START_DATE', startDate: moment().subtract(1, "months").toDate()})
                break
            case "3m":
                dispatch({type: 'SET_START_DATE', startDate: moment().subtract(3, "months").toDate()})
                break
            case "6m":
                dispatch({type: 'SET_START_DATE', startDate: moment().subtract(6, "months").toDate()})
                break
            case "1y":
                dispatch({type: 'SET_START_DATE', startDate: moment().subtract(1, "years").toDate()})
                break
            case "5y":
                dispatch({type: 'SET_START_DATE', startDate: moment().subtract(5, "years").toDate()})
                break
            case "10y":
                    dispatch({type: 'SET_START_DATE', startDate: moment().subtract(10, "years").toDate()})
                    break
            case "15y":
                dispatch({type: 'SET_START_DATE', startDate: moment().subtract(15, "years").toDate()})
                break
            case "all":
                dispatch({type: 'SET_START_DATE', startDate: moment("2002.02.01", "YYYY.MM.DD").toDate()})
                break
        }
    }

    const handleDatesEnd = (value) => {
        dispatch({type: 'SET_TOGGLE_END', button: value})
        switch (value) {
            case "0m":
                dispatch({type: 'SET_END_DATE', endDate: moment().subtract(0, "months").toDate()})
                break
            case "1m":
                dispatch({type: 'SET_END_DATE', endDate: moment().subtract(1, "months").toDate()})
                break
            case "3m":
                dispatch({type: 'SET_END_DATE', endDate: moment().subtract(3, "months").toDate()})
                break
            case "6m":
                dispatch({type: 'SET_END_DATE', endDate: moment().subtract(6, "months").toDate()})
                break
            case "1y":
                dispatch({type: 'SET_END_DATE', endDate: moment().subtract(1, "years").toDate()})
                break
            case "5y":
                dispatch({type: 'SET_END_DATE', endDate: moment().subtract(5, "years").toDate()})
                break
            case "10y":
                    dispatch({type: 'SET_END_DATE', endDate: moment().subtract(10, "years").toDate()})
                    break
        }
    }

    return (
        <div>
            <ToggleButtonGroup 
                size="sm" className="mb-2"
                name="dates"
                type="radio"
                value={state.toggle_start} 
                className="ml-0"
                onChange={handleDates}>
                <ToggleButton variant="secondary" value={'1m'}>1M</ToggleButton>
                <ToggleButton variant="secondary" value={'3m'}>3M</ToggleButton>
                <ToggleButton variant="secondary" value={'6m'}>6M</ToggleButton>
                <ToggleButton variant="secondary" value={'1y'}>1A</ToggleButton>
                <ToggleButton variant="secondary" value={'5y'}>5A</ToggleButton>
                <ToggleButton variant="secondary" value={'10y'}>10A</ToggleButton>
                <ToggleButton variant="secondary" value={'15y'}>15A</ToggleButton>
            </ToggleButtonGroup>
            <ToggleButtonGroup 
                size="sm" className="mb-2"
                name="dates"
                type="radio"
                value={state.toggle_end} 
                className="ml-3"
                onChange={handleDatesEnd}>
                <ToggleButton variant="secondary" value={'10y'}>10A</ToggleButton>
                <ToggleButton variant="secondary" value={'5y'}>5A</ToggleButton>
                <ToggleButton variant="secondary" value={'1y'}>1A</ToggleButton>
                <ToggleButton variant="secondary" value={'6m'}>6M</ToggleButton>
                <ToggleButton variant="secondary" value={'3m'}>3M</ToggleButton>
                <ToggleButton variant="secondary" value={'1m'}>1M</ToggleButton>
                <ToggleButton variant="secondary" value={'0m'}>Agora</ToggleButton>
            </ToggleButtonGroup>
        </div>
    )
}

export {SelectDates as default}