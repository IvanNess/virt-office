export const updateShowMenu = (state, action)=>{
    if(state===undefined){
        return {
            show: false,
        }
    }
    switch(action.type){
        case "SET_SHOW_MENU":
            return { show: action.value }
        default:
            return state.showMenu
    }
}