export const updateUserReservations = (state, action)=>{
    if(state===undefined){
        return null
    }
    // console.log('action', action)

    switch(action.type){
        
        case "SET_USER_RESERVATIONS":
            // console.log('SET_USER_RESERVATIONS', action.reservations)
            return action.reservations
        case "ADD_RESERVATION":
            // console.log("ADD_RESERVED_SESSIONS")
            return [...state.userReservations, action.reservation]
        default:
            return state.userReservations
    }
}