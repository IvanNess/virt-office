import moment from 'moment'

export const updateSelectedDates = (state, action)=>{
    if(state===undefined){
        const date = new Date()
        return [ `${moment(date).format('YYYY-MM-DD')}` ]
    }
    switch(action.type){
        case "ADD_SELECTED_DATE":
            return [...state.selectedDates, action.date]
        default:
            return state.selectedDates
    }
}