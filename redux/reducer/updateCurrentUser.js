export const updateCurrentUser = (state, action)=>{
    if(state===undefined){
        return null
    }
    switch(action.type){
        case "SET_CURRENT_USER":
            return action.user
        case "EDIT_CURRENT_USER":
            return {...state.currentUser, ...action.values}
        default:
            return state.currentUser
    }
}