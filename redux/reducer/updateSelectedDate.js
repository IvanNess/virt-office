import moment from 'moment'
import { getCurrentDate } from '../../utilities'

export const updateSelectedDate = (state, action)=>{
    if(state===undefined){
        const date = getCurrentDate()
        // const date = new Date()
        // const date = new Date(2021, 4, 21)
        return {
            day: moment(date).format('DD'),
            month: moment(date).format('MM'),
            year: moment(date).format('YYYY'),
            raw: date,
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