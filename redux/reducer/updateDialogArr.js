export const updateDialogArr = (state, action)=>{
    if(state===undefined){
        return[]
    }
    switch(action.type){ 
        case "SET_DIALOG_ARR":
            return action.dialogs                    
        default:
            return state.dialogArr
    }
}