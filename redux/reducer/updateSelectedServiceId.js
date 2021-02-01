export const updateSelectedServiceId = (state, action)=>{
    if(state===undefined){
        return null
    }
    switch(action.type){
        case "UPDATE_SELECTED_SERVICE_ID":
            return action.id
        default:
            return state.selectedServiceId
    }
}