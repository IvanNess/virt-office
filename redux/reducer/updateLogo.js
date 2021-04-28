export const updateLogo = (state, action)=>{
    if(state===undefined){
        return null
    }
    switch(action.type){
        case "SET_LOGO":
            return action.value
        default:
            return state.logo
    }
}