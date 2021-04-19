export const updatePackages = (state, action)=>{
    if(state===undefined){
        return null
    }
    switch(action.type){
        case "SET_PACKAGES":
            return action.value
        default:
            return state.packages
    }
}