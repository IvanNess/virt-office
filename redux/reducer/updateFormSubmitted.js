export const updateFormSubmitted = (state, action)=>{
    if(state===undefined){
        return false
    }
    switch(action.type){
        case "FORM_SUBMITTED":
            return !state.formSubmitted
        default:
            return state.formSubmitted
    }
}