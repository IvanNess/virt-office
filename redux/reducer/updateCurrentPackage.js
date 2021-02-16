export const updateCurrentPackage = (state, action)=>{
    if(state===undefined){
        return null
    }
    switch(action.type){
        case "SET_CURRENT_PACKAGE":
            return action.pack
        default:
            return state.currentPackage
    }
}