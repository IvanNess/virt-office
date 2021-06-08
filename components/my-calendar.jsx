import React, { useState } from 'react'
import { getCurrentDate } from '../utilities'
import moment from 'moment'
import { useEffect } from 'react'
import styles from '../styles/MyCalendar.module.scss'
import { useSelector, useDispatch } from 'react-redux'
import { setSelectedDate } from '../redux/actions'
import {utcOffset, week, monthNames} from '../accessories/constants'
import { RightOutlined, LeftOutlined } from '@ant-design/icons'
import { useRouter } from 'next/router'

const MyCalendar = () => {

    const [dayArr, setDayArr] = useState([])
    const [rows, setRows] = useState([])
    // const [currentDate, setCurrentDate] = useState(moment().utcOffset(utcOffset))
    const selectedDate = useSelector(state=>state.selectedDate)
    const language = useSelector(state=>state.language)

    const dispatch = useDispatch()
    const router = useRouter()

    const firstDate = getCurrentDate()

    useEffect(()=>{
        console.log('selected date', selectedDate)
        const dayArr = getDays(selectedDate.raw)
        const rows = getRows(dayArr)
        setRows(rows)
    }, [selectedDate])

    const getDays = (rawSelectedDate)=>{
        // const currentDate = getCurrentDate()
        const currentDate = moment(rawSelectedDate)
        console.log('current date', currentDate, currentDate.hours(), currentDate.date() )

        const currentMonth = currentDate.month()
        const currentYear = currentDate.year()
        
        const firstCurMonthDate = moment([currentYear, currentMonth, 1]).utcOffset(utcOffset, true)
        const currentDay = firstCurMonthDate.day()
        let dayArr = []
        const firstIdx = currentDay === 0 ? 6 : currentDay - 1
        dayArr[firstIdx] = firstCurMonthDate
        console.log('day arr', dayArr)
        
        for (let index = firstIdx - 1; index >= 0; index--) {
           dayArr[index] = moment(firstCurMonthDate).subtract(firstIdx - index, 'days')
        }
        console.log('day arr', dayArr)

        let cur = firstCurMonthDate
        let idx = firstIdx + 1
        while(true){
            cur = moment(cur).add(1, 'days')
            dayArr[idx] = cur
            idx += 1
            if((moment(cur).month() !== moment(firstCurMonthDate).month()) &&  moment(cur).day() === 0){
                break
            }
        }
        console.log('day arr', dayArr)

        return dayArr
    }

    function dayClicked(day){
        dispatch(setSelectedDate(day, true))
    }

    const getRows = (dayArr)=>{
        const quantity = dayArr.length / 7

        let rows = []

        for (let i = 0; i < quantity; i++) {
            rows[i] = (
                <div className={styles.row} key={i}>
                    {dayArr.slice(i*7, i*7+7).map((day, idx)=>{
                        const currentDate = moment(selectedDate.raw)
                        const dayClassName=
                            (day.date()===currentDate.date() && day.month()===currentDate.month() && day.year()===currentDate.year())? 'current':
                            (day.date()===firstDate.date() && day.month()===firstDate.month() && day.year()===firstDate.year())? 'first':
                            day.month() !== currentDate.month() ? 'other':
                            'day'
                        return(
                            <div className={styles.dayWrapper} key={`${i}${idx}`} onClick={()=>{dayClicked(day)}}>
                                <div className={styles[dayClassName]}>{day.date()}</div>
                            </div>
                        )
                    })}
                </div>
            )
        }

        return rows
    }

    const nextMonth = ()=>{
        dispatch(setSelectedDate(moment(selectedDate.raw).add(1, 'month'), true))
    }

    const prevMonth = ()=>{
        dispatch(setSelectedDate(moment(selectedDate.raw).subtract(1, 'month'), true))
    }

    const getWeek = ()=>week[language].map(name=><div className={styles.weekDay}>{name}</div>)

    const getCurrentMonthName = ()=>(`${monthNames[language][selectedDate.month -1]} ${selectedDate.year}`)

    return (
        <div className={router.pathname ==='/konto/rezerwacja' ? styles.myRezCalendar : styles.myCalendar} >
            <div className={styles.top}>
                <div className={styles.arrow} onClick={prevMonth}><LeftOutlined style={{color: '#474747'}} /></div>
                <div className={styles.monthName}>{getCurrentMonthName()}</div>
                <div className={styles.arrow} onClick={nextMonth}><RightOutlined style={{color: '#474747'}}/></div>
            </div>
            <div className={styles.week}>{getWeek()}</div>
            <div className={styles.rows}>{rows}</div>
        </div>
    )
}

export default MyCalendar
