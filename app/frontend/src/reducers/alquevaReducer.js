const alquevaReducer = (state, action) => {
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
        case 'SET_TOGGLE':
            return {
                ...state,
                toggle: action.button
            }
        default:
            return state
    }

}

export {alquevaReducer as default}