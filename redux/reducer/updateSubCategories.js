export const updateSubCategories = (state, action)=>{
    if(state===undefined){
        return []
    }
    switch(action.type){ 
        case "ADD_SUBCATEGORIES":
            return action.subCategories            
        default:
            return state.subCategories
    }
}