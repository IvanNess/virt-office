export const updateCalendarRedirect = (state, action)=>{
    if(state===undefined){
        return false
    }
    switch(action.type){ 
        case "SET_CALENDAR_REDIRECT":
            return action.redirect            
        default:
            return state.calendarRedirect
    }
}