export const updateReservedHoursUtilities = (state, action)=>{
    if(state===undefined){
        return {
            startHour: null,
            finishHour: null,
            updHours: [],
            isUpdHoursInited: false
        }
    }
    switch(action.type){
        case "SET_RESERVED_HOURS_UTILITIES_PROP":
            return {
                ...state.reservedHoursUtilities,
                [action.prop]: action.value
            }

        default:
            return state.reservedHoursUtilities
    }
}