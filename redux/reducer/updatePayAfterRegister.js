export const updatePayAfterRegister = (state, action)=>{
    if(state===undefined){
        return false
    }
    switch(action.type){
        case "SET_PAY_AFTER_REGISTER":
            return action.value
        default:
            return state.payAfterRegister
    }
}