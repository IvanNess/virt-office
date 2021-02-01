export const updateHiringChoices = (state, action)=>{
    if(state===undefined){
        return [
            {
                name: "1. wybór usługi biura wirtualnego",
                choice: "",
                isComplete: false
            },
            {
                isComplete: false,
                choice: "",
                name: "2. wybierz profesjonalny adres swojej firmy:"
            },
            {
                name: "3. WYBIERZ CZAS TRWANIA UMOWY:".toLowerCase(),
                choice: '',
                isComplete: false
            },
            {
                choice: "",
                isComplete: false
            },
            {
                choice: "",
                isComplete: false
            }
        ]
    }

    switch(action.type){      
        case "UPDATE_HIRING_CHOICE":
            return [
                ...state.hiringChoices.slice(0, action.number-1),
                {...state.hiringChoices[action.number-1], [action.prop]: action.value},
                ...state.hiringChoices.slice(action.number-1+1)
            ]
        default:
            return state.hiringChoices
    }
}