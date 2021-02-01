import moment from 'moment'

export const updateShowAuth = (state, action)=>{
    if(state===undefined){
        return false
    }
    switch(action.type){
        case "SET_SHOW_AUTH":
            return action.value
        default:
            return state.showAuth
    }
}