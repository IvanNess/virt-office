export const updateForgetForm = (state, action)=>{
    if(state===undefined){
        return {
            email: '',
            accessCode: ''
        }
    }
    switch(action.type){
        case "SET_FORGET_FORM_PROP":
            return {
                ...state.forgetForm,
                [action.prop]: action.value
            }
        case "LOGOUT":
            return {
                email: '',
                accessCode: ''
            }
        default:
            return state.forgetForm
    }
}