// import equals from 'equals'
// import { updateArrayByItem } from '../../utils/calcs'

export const updateOffers = (state, action)=>{
    if(state===undefined){
        return []
    }
    switch(action.type){
        // case "SET_OFFERS":
        //     return action.offers
        // case "ADD_OFFER":
        //     const offer = state.offers.find(offer=>offer.id===action.offer.id)
        //     if(offer){
        //         if(equals(offer, action.offer)){
        //             console.log('equals')
        //             return state.offers
        //         } else{
        //             console.log('not equals')
        //             return updateArrayByItem(state.offers, action.offer)
        //         }
        //     }
        //     return [...state.offers, action.offer]    
        default:
            return state.offers
    }
}