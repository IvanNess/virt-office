export const updateLanguage = (state, action)=>{
    if(state===undefined){
        return 'pl'
    }
    switch(action.type){
        case "SET_LANGUAGE":
            if(['pl', 'ua', 'en'].includes(action.value))
                return action.value
        default:
            return state.language
    }
}