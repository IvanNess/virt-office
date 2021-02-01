// import equals from 'deep-equals'
// import { updateArrayByItem } from '../../utils/calcs'

export const updateReviews = (state, action)=>{
    if(state===undefined){
        return []
    }
    switch(action.type){ 
        // case "ADD_REVIEW":
        //     const review = state.reviews.find(review=>review.id===action.review.id)
        //     if(review){
        //         if(equals(review, action.review)){
        //             console.log('equals')
        //             return state.reviews
        //         } else{
        //             console.log('not equals', review, action.review)
        //             return updateArrayByItem(state.reviews, action.review)
        //         }
        //     }
        //     return [...state.reviews, action.review]            
        // case "UPDATE_REVIEW":
        //     return updateArrayItem(state.reviews, action.review)                    
        default:
            return state.reviews
    }
}