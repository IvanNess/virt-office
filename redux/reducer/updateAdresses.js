// import equals from 'deep-equals'
// import { updateArrayByItem } from '../../utils/calcs'

export const updateAdresses = (state, action)=>{
    if(state===undefined){
        return []
    }
    switch(action.type){ 
        // case "ADD_ADRESS":
        //     const adress = state.adresses.find(adress=>adress.id===action.adress.id)
        //     if(adress){
        //         if(equals(adress, action.adress)){
        //             console.log('equals')
        //             return state.adresses
        //         } else{
        //             console.log('not equals', adress, action.adress)
        //             return updateArrayByItem(state.adresses, action.adress)
        //         }
        //     }
        //     return [...state.adresses, action.adress]            
        // case "UPDATE_ADRESS":
        //     return updateArrayItem(state.adresses, action.adress)                    
        default:
            return state.adresses
    }
}