export const updateSelectedPeriodId = (state, action)=>{
    if(state===undefined){
        return null
    }
    switch(action.type){
        case "UPDATE_SELECTED_PERIOD_ID":
            return action.id
        default:
            return state.selectedPeriodId
    }
}