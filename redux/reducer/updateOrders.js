// import equals from 'equals'
// import { updateArrayByItem } from '../../utils/calcs'

export const updateOrders = (state, action)=>{
    if(state===undefined){
        return []
    }
    switch(action.type){
        // case "SET_ORDERS":
        //     return action.orders
        // case "ADD_ORDER":
        //     const order = state.orders.find(order=>order.id===action.order.id)
        //     if(order){
        //         if(equals(order, action.order)){
        //             console.log('equals')
        //             return state.orders
        //         } else{
        //             console.log('not equals')
        //             return updateArrayByItem(state.orders, order)
        //         }
        //     }
        //     return [...state.orders, action.order]    
        default:
            return state.orders
    }
}