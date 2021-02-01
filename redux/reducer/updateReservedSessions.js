export const updateReservedSessions = (state, action)=>{
    if(state===undefined){
        return [
            // {
            //     year: "2021",
            //     month: "01",
            //     day: "27",
            //     startHourId: "1200",
            //     finishHourId: "1330",
            //     msStart: +new Date(2021, 0, 27, 12),
            //     msFinish:  +new Date(2021, 0, 27, 13, 30)
            // },
            // {
            //     year: "2021",
            //     month: "01",
            //     day: "27",
            //     startHourId: "1530",
            //     finishHourId: "1600",
            //     msStart:  +new Date(2021, 0, 27, 15, 30),
            //     msFinish:  +new Date(2021, 0, 27, 16)
            // },
            // {
            //     year: "2021",
            //     month: "01",
            //     day: "28",
            //     startHourId: "1430",
            //     finishHourId: "1500",
            //     msStart:  +new Date(2021, 0, 28, 14, 30),
            //     msFinish:  +new Date(2021, 0, 28, 15)
            // }
        ]
    }
    console.log('action', action)
    const sessions = action.sessions?.map(session=>({
        year: session.year,
        month: session.month,
        day: session.day,
        startHourId: session.startHour.id,
        finishHourId: session.finishHour.id,
        msStart:  session.startHour.msTime,
        msFinish:  session.finishHour.msTime
    }))
    switch(action.type){
        
        case "SET_RESERVED_SESSIONS":
            // console.log("SET_RESERVED_SESSIONS")
            return sessions
        case "ADD_RESERVED_SESSIONS":
            // console.log("ADD_RESERVED_SESSIONS")
            return [...state.reservedSessions, ...sessions]
        case "UPDATE_RESERVED_SESSIONS":
            //delete old data for updated day. 
            //build new array without data for updated day
            let updateReservedSessions = []
            const selectedDate = state.selectedDate
            state.reservedSessions.forEach(session=>{
                if(session.day!==selectedDate.day || session.month!==selectedDate.month || session.year!==selectedDate.year){
                    updateReservedSessions = [...updateReservedSessions, session]
                }
            })
            //update this array with a new data
            return [...updateReservedSessions, ...sessions]
        case "GET_CASHED_RESERVED_SESSIONS":
            return [...state.reservedSessions]
        default:
            return state.reservedSessions
    }
}