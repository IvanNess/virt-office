export const updateCurrentUser = (state, action)=>{
    if(state===undefined){
        return null
    }
    switch(action.type){
        case "SET_CURRENT_USER":
            return action.user
        default:
            return state.currentUser
    }
}