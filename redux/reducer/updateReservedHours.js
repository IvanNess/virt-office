export const updateReservedHours = (state, action)=>{
    if(state===undefined){
        return []
    }
    switch(action.type){
        case "ADD_RESERVED_HOUR":
            return [...state.selectedHours, action.hour]
        default:
            return state.reservedHours
    }
}