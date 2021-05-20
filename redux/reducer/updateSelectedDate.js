import moment from 'moment'

export const updateSelectedDate = (state, action)=>{
    if(state===undefined){
        const date = new Date()
        return {
            day: moment(date).format('DD'),
            month: moment(date).format('MM'),
            year: moment(date).format('YYYY'),
            // raw: new Date(),
            reinitHours: true,
            registerAndReserve: false
        }
    }
    switch(action.type){
        case "SET_SELECTED_DATE":
            return {
                ...state.selectedDate,
                day: moment(action.date).format('DD'),
                month: moment(action.date).format('MM'),
                year: moment(action.date).format('YYYY'),
                raw: action.date,
                reinitHours: action.reinitHours || false
            }
        case "EDIT_SELECTED_DATE":
            return {
                ...state.selectedDate,
                reinitHours: action.reinitHours || false
            }
        case "REGISTER_AND_RESERVE":
            return {
                ...state.selectedDate,
                registerAndReserve: action.registerAndReserve || false
            }
        default:
            return state.selectedDate
    }
}