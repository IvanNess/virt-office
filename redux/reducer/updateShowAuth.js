import moment from 'moment'

export const updateShowAuth = (state, action)=>{
    if(state===undefined){
        return {
            show: false,
            isLogin: true
        }
    }
    switch(action.type){
        case "SET_SHOW_AUTH":
            return { ...state.showAuth, ...action.value }
        default:
            return state.showAuth
    }
}