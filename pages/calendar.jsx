import React, { useEffect, useState } from "react";
import DateFnsUtils from '@date-io/date-fns';
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import moment from 'moment'
import styles from '../styles/Calendar.module.scss'
import Hours from "../components/hours";
import { useDispatch, useSelector } from "react-redux";
import {setSelectedDate, addReservedHour, setCurrentUser} from '../redux/actions'
import firebase from 'firebase'
// import locale from "date-fns/locale/en-GB";
// import locale from "date-fns/locale/pl";
import locale from '../accessories/pl'
import { getCurrentDate } from "../utilities";
import useWindowWidth from "../hooks/useWindowWidth";
import { useRouter } from "next/router";
import { useRef } from "react";
// import DatePicker from 'react-datepicker'
// import "react-datepicker/dist/react-datepicker.css";
import {format, parseISO} from 'date-fns'
import { convertToLocalTime } from 'date-fns-timezone';
import MyCalendar from "../components/my-calendar";

export const DEFAULT_DATE_FORMAT = 'yyyy-MM-dd';

const Calendar = ({db, auth}) => {

    console.log('auth', auth.currentUser)

    const dispatch = useDispatch()

    const selectedDate = useSelector(state=>state.selectedDate)
    const [calendarValue, setCalendarValue] = useState(new Date())

    const selectedHours = useSelector(state=>state.selectedHours)

    const currentUser = useSelector(state=>state.currentUser)

    const [hoursReset, setHoursReset] = useState(0)

    const windowWidth = useWindowWidth()
    const router = useRouter()
    const calendarRef = useRef()

    useEffect(()=>{
        console.log('SET CALENDAR VALUE', selectedDate.raw, selectedDate)
        setCalendarValue(selectedDate.raw)
    }, [selectedDate])

    // async function getReservedHoursPrivateData(){
    //     try {
    //         db.collectionGroup('private').where("email", "==", currentUser.email).onSnapshot(snapshot=>{
    //             console.log('snapshot', snapshot)
    //             snapshot.docs.forEach(async doc=>{
    //                 console.log('doc', doc.id, doc.data())
    //                 doc.ref.parent.parent.onSnapshot(snapshot=>{
    //                     console.log('parent snapshot', snapshot.data())
    //                 })
    //                 const data = await doc.ref.parent.parent.get()
    //                 console.log('data', data.data())
    //             })
    //         })
    //         // console.log('collections', collections)
    //     } catch (error) {
    //         console.log('error', error)
    //     }
           
    // }

    // async function getReservedHours(){
    //     try {
    //         db.collection('reservedHours').onSnapshot(snapshot=>{
    //             snapshot.docs.forEach(doc=>{
    //                 // console.log('reserved doc', doc.id, doc.data())
    //                 const seconds = doc.data().timestamp?.seconds
    //                 // console.log(seconds)
    //                 if(seconds){
    //                     const date = new Date(seconds*1000 + 5*60*1000)
    //                     // console.log(moment(date).format('DD MM YY HH:mm:ss'))
    //                 }
    //             })
    //         })
    //         // console.log('collections', collections)
    //     } catch (error) {
    //         console.log('error', error)
    //     }
           
    // }
    
    // useEffect(()=>{
    //     if(currentUser){
    //         console.log('current user', currentUser)
    //         getReservedHoursPrivateData()
    //         getReservedHours()
            
    //         // db.collection("reservedHours")
    //         //     // .orderBy('timestamp', 'desc')
    //         //     // .where("email", "==", currentUser.email)
    //         //     .onSnapshot(async snapshot=>{
    //         //         // console.log('snapshot', snapshot.docs)
    //         //         snapshot.docs.map(async doc=>{
    //         //             console.log('doc', doc)
    //         //             dispatch(addReservedHour({
    //         //                 id: doc.id,
    //         //                 ...doc.data() 
    //         //             }))
    //         //             try {
    //         //                 const collections = await db.collection("reservedHours").doc(doc.id).collection('private')
    //         //                 .where("email", "==", "chai@bk.ru").get()
    //         //                 console.log('collections', collections)   
    //         //                 collections.forEach(collection=>{
    //         //                     console.log('collection', collection.data()) 
    //         //                 }) 
    //         //             } catch (error) {
    //         //                 console.log('error', error) 
    //         //             }  
                                   
    //         //         })
    //         //     }  
    //         // )

    //     }
    // }, [currentUser])

    const onChange = e=> {
        console.log(e)
        console.log(new Date())
        console.log(+new Date(e))
        console.log(moment(e).format('DD MM YY'))
        dispatch(setSelectedDate(e, true))
        setHoursReset(hoursReset=>hoursReset+1)
    }

    const shouldDisableDate = date =>{
        const day = moment(date).format('DD')
        return day === "19"
    }

    const renderDay = (day, selectedDate, dayInCurrentMonth, dayComponent) =>{
        // return dayComponent
        return (
            <div className={styles.own}>
                {dayComponent}
            </div>
        )
    }

    const reserve =async (e)=>{
        e.preventDefault()

        for (const hour of selectedHours) {
            console.log('hour', hour)

            const ref = await db.collection("reservedHours").add({
                day: hour.day,
                hourId: hour.hourId,
                month: hour.month,
                year: hour.year,
                // email: hour.email,
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            })
            console.log("ref", ref)
            // await ref.collection("private").add({
            //     email: currentUser.email
            // })  
        } 
    }

    return (
        <div className={router.asPath.includes('/konto') ? styles.rezCalendar : styles.calendar} >
            {/* <MuiPickersUtilsProvider utils={DateFnsUtils} locale={locale}>
                <DatePicker
                    disableToolbar
                    // autoOk
                    orientation="landscape"
                    variant="static"
                    openTo="date"
                    value={calendarValue}
                    onChange={onChange}
                    onMonthChange={onChange}
                    // disablePast={true}
                    // shouldDisableDate={shouldDisableDate}
                    renderDay={renderDay}
                    // initialFocusedDate={getCurrentDate()}
                />
            </MuiPickersUtilsProvider> */}
             {/* <DatePicker
                selected={calendarValue}
                onChange={date => onChange(date)}
                inline
            /> */}
            <MyCalendar/>
            <Hours db={db} auth={auth} outterReset={hoursReset}/>
        </div>
        
    );
}

export default Calendar