// import equals from 'deep-equals'
// import { updateArrayByItem } from '../../utils/calcs'

export const updateUsers = (state, action)=>{
    if(state===undefined){
        return []
    }
    switch(action.type){ 
        // case "ADD_USER":
        //     const user = state.users.find(user=>user.id===action.user.id)
        //     if(user){
        //         if(equals(user, action.user)){
        //             console.log('equals')
        //             return state.users
        //         } else{
        //             console.log('not equals', user, action.user)
        //             return updateArrayByItem(state.users, action.user)
        //         }
        //     }
        //     return [...state.users, action.user]            
        // case "UPDATE_USER":
        //     return updateArrayItem(state.users, action.user)                    
        default:
            return state.users
    }
}