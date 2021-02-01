export const updateSelectedHours = (state, action)=>{
    if(state===undefined){
        return []
    }
    switch(action.type){
        case "ADD_SELECTED_HOUR":
            return [...state.selectedHours, {
                hourId: action.id,
                day: state.selectedDate.day,
                month: state.selectedDate.month,
                year: state.selectedDate.year,
                // email: state.currentUser.email
            }]
        case "REMOVE_SELECTED_HOUR":
            return [
                ...state.selectedHours.slice(0, action.idx),
                ...state.selectedHours.slice(action.idx + 1)
            ]
        default:
            return state.selectedHours
    }
}