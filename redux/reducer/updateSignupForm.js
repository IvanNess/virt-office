export const updateSignupForm = (state, action)=>{
    if(state===undefined){
        return {}
    }
    switch(action.type){
        case "SET_SIGNUP_FORM_PROP":
            return {
                ...state.signupForm,
                [action.prop]: action.value
            }
        default:
            return state.signupForm
    }
}