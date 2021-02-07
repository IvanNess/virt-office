export const updateWynajecieForm = (state, action)=>{
    if(state===undefined){
        return {}
    }
    switch(action.type){
        case "SET_WYNAJECIE_FORM":
            return action.value
        case "SET_WYNAJECIE_FORM_PROP":
            return {
                ...state.wynajecieForm,
                [action.prop]: action.value
            }
        default:
            return state.wynajecieForm
    }
}