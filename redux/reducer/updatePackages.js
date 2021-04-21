export const updatePackages = (state, action)=>{
    if(state===undefined){
        return null
    }
    switch(action.type){
        case "SET_PACKAGES":
            return action.value
        case "LOGOUT":
            return null
        default:
            return state.packages
    }
}