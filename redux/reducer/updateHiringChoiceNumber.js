export const updateHiringChoiceNumber = (state, action)=>{
    if(state===undefined){
        return 1
    }
    switch(action.type){ 
        case "SET_HIRING_CHOICE_NUMBER":
            return action.number            
        default:
            return state.hiringChoiceNumber
    }
}