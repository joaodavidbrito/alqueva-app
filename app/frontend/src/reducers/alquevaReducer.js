import moment from 'moment'

const alquevaReducer = (state, action) => {
    if(action.type === 'SET_START_DATE' || action.type === 'SET_END_DATE') {
        if(!validateDates(state, action)) {
            return {
                ...state,
                startDate: action.startDate ? action.startDate : state.startDate,
                toggle_start: action.startDate ? '15y' : state.toggle_start,
                endDate: action.endDate ? action.endDate : state.endDate,
                toggle_end: action.endDate ? '0m' : state.toggle_end
            }
        }
    }
    switch(action.type) {
        case 'SET_FILTERED_DATA':
            return {
                ...state,
                filteredData: action.formatedData
            }
        case 'SET_ACTUAL':
            return {
                ...state,
                actualDate: action.current[0],
                actualValue: action.current[1]
            }
        case 'UPDATE_STATS':
            return {
                ...state,
                stats: {
                    min: action.min,
                    minDate: action.minDate,
                    avg: action.avg,
                    max: action.max,
                    maxDate: action.maxDate
                }
            }
        case 'SET_WATER_DATA':
            return {
                ...state,
                waterData: action.waterData
            }
        case 'SET_ACTUAL_VALUE':
            return {
                ...state,
                actualVAlue: action.value
            }
        case 'SET_START_DATE':
            return {
                ...state,
                startDate: action.startDate
            }
        case 'SET_END_DATE':
            return {
                ...state,
                endDate: action.endDate
            }
        case 'SET_TOGGLE_START':
            return {
                ...state,
                toggle_start: action.button
            }
        case 'SET_TOGGLE_END':
            return {
                ...state,
                toggle_end: action.button
            }
        default:
            return state
    }

}

const validateDates = (state, action) => {
    if (action.endDate) {
        if(moment(state.startDate).isAfter(moment(action.endDate))){
            action.endDate = moment().toDate()
        }
    } else {
        if(moment(state.endDate).isBefore(moment(action.startDate))){
            action.startDate = moment(action.startDate).subtract(6, "months").toDate()
        }
    }
}

export {alquevaReducer as default}