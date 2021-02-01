export const updateDialogs = (state, action)=>{
    if(state===undefined){
        return{}
    }
    switch(action.type){
        case "ADD_DIALOG":
            const dialog = state.dialogs[action.dialogName]
            console.log('add dialog dialog', dialog)
            if(dialog){
                return state.dialogs
            }
            return {...state.dialogs,
                [action.dialogName]: action.dialog
            }
        case "UPDATE_DIALOG":
            return {...state.dialogs, 
                [action.dialogName]: {
                    ...state.dialogs[action.dialogName], ...action.update
                }
            }  
        case "SET_DIALOGS":
            const items = actions.dialogs.reduce((res, dialog)=>{
                return {...res, [''+dialog.orderStringCode+dialog.candidateUsername]: dialog}
            }, {})    
            return items                    
        default:
            return state.dialogs
    }
}