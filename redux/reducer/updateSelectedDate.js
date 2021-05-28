import moment from 'moment'
import { getCurrentDate } from '../../utilities'

export const updateSelectedDate = (state, action)=>{
    if(state===undefined){
        const date = getCurrentDate()
        // const date = new Date()
        // const date = new Date(2021, 4, 21)
        return {
            day: moment(date).date(),
            month: moment(date).month() + 1,
            year: moment(date).year(),
            raw: date,
            reinitHours: true,
            registerAndReserve: false
        }
    }
    switch(action.type){
        case "SET_SELECTED_DATE":
            console.log('SET_SELECTED_DATE', action.date, action.date.hour())
            return {
                ...state.selectedDate,
                day: moment(action.date).date(),
                month: moment(action.date).month() + 1,
                year: moment(action.date).year(),
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