export const updateCategories = (state, action)=>{
    if(state===undefined){
        return []
    }
    switch(action.type){ 
        case "ADD_CATEGORIES":
            return action.categories            
        default:
            return state.categories
    }
}