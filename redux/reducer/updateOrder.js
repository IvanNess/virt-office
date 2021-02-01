export const updateOrder = (state, action)=>{
    if(state===undefined){
        return{
            data: null,
            loading: true,
            error: null
        }
    }
    switch(action.type){
        case "FETCH_ORDER_START":
            return {data: null, loading: true, error: false}
        case "FETCH_ORDER_SUCCESS":
            return {data: action.order, loading: false, error: false}
        case "FETCH_ORDER_FAILURE":
            return {data: false, loading: false, error: action.error}
        default:
            return state.order
    }
}