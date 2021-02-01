export const updateLoginForm = (state, action)=>{
    if(state===undefined){
        return {}
    }
    switch(action.type){
        case "SET_LOGIN_FORM_PROP":
            return {
                ...state.loginForm,
                [action.prop]: action.value
            }
        default:
            return state.loginForm
    }
}