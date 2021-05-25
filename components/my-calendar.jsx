import React from 'react'
import { getCurrentDate } from '../utilities'
import moment from 'moment'

const MyCalendar = () => {

    const getDays = ()=>{
        // const currentDate = getCurrentDate()
        const currentDate = new Date(2021, 4, 27)

        const currentDay = currentDate.getDay()
        console.log('current date', currentDate)
        let dayArr = []
        const firstIdx = currentDay === 0 ? 6 :currentDay - 1
        dayArr[firstIdx] = currentDate
        console.log('day arr', dayArr)
        
        for (let index = firstIdx - 1; index >= 0; index--) {
           dayArr[index] = moment(currentDate).subtract(firstIdx - index, 'days').format('DD MM YY')
        }
        console.log('day arr', dayArr)

        let cur = currentDate
        let idx = firstIdx + 1
        while(true){
            cur = moment(cur).add(1, 'days')
            dayArr[idx] = cur.format('DD MM YY')
            idx += 1
            if(moment(cur).date()===30){
                break
            }
        }
        console.log('day arr', dayArr)
       
    }

    return (
        <div className={styles.myCalendar}>
            
        </div>
    )
}

export default MyCalendar
