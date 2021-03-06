import React, { useEffect, useState } from 'react'
import {hours} from '../accessories/options'

import styles from '../styles/Hours.module.scss'
import { useSelector, useDispatch } from 'react-redux'
import moment from 'moment'
import { loadStripe } from "@stripe/stripe-js";

import { addSelectedHour, removeSelectedHour, addReservedSession, addSelectedDate, getCashedReservedSessions, updateReservedSessions, setUserReservations, addReservation, setReservedHoursUtilitiesProp, editSelectedDate, setShowAuth, registerAndReserve  } from '../redux/actions'

import firebase from 'firebase'
import YourReservation from './your-reservation'
import axios from 'axios'
import { reservationPay, przelewyReservationPay } from '../utilities'
import { LoadingOutlined } from '@ant-design/icons'
import useWindowWidth from '../hooks/useWindowWidth'
import { useRouter } from 'next/router'
import { utcOffset, buttonNames, phrases } from '../accessories/constants'
import { Modal } from 'antd'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE);

function Hours({db, auth , outterReset}) {

    const dispatch = useDispatch()
    const selectedHours = useSelector(state => state.selectedHours)
    const selectedDate = useSelector(state => state.selectedDate)
    const selectedDates = useSelector(state => state.selectedDates)
    const reservedSessions = useSelector(state => state.reservedSessions)
    // const userReservations = useSelector(state => state.userReservations)
    const showAuth = useSelector(state=>state.showAuth)
    const language = useSelector(state=>state.language)

    const currentUser = useSelector(state=>state.currentUser)

    // const [startHour, setStartHour] = useState(null)
    const startHour = useSelector(state=>state.reservedHoursUtilities.startHour)
    const finishHour = useSelector(state=>state.reservedHoursUtilities.finishHour)
    // const [finishHour, setFinishHour] = useState(null)

    const [isCancelRedirect, setIsCancelRedirect] = useState(null)

    // const [updHours, setUpdHours] = useState([])
    const updHours = useSelector(state=>state.reservedHoursUtilities.updHours)

    // const [isUpdHoursInited, setIsUpdHoursInited] = useState(false)
    const isUpdHoursInited = useSelector(state=>state.reservedHoursUtilities.isUpdHoursInited)

    const [isStartHour, setIsStartHour] = useState(false)

    const disableConfirmBtn = useSelector(state=>state.selectedDate.registerAndReserve)

    const windowWidth = useWindowWidth()
    const router = useRouter()

    function initUpdHours(){
        console.log('init hours')
        const updHours = hours.map(hour=>{
            // console.log('selected date', selectedDate, moment(selectedDate.raw).year(), moment(selectedDate.raw).month(), moment(selectedDate.raw).date())
            const {year, month, day} = selectedDate
            // const msTime = +new Date(year, Number(month)-1, day, hour.hours, hour.minutes) 
            const dateNow = +new Date()
            const msTime = moment(new Date(
                moment(selectedDate.raw).year(), 
                moment(selectedDate.raw).month(), 
                moment(selectedDate.raw).date(), 
                hour.hours, 
                hour.minutes
            )).utcOffset(utcOffset, true).valueOf()

            return {
                ...hour,
                msTime,
                className: dateNow + 1*60*60*1000 - msTime <= 0? 'init': 'past'
                // className: 'init'
            }
        })
        // setUpdHours(updHours)
        dispatch(setReservedHoursUtilitiesProp('updHours', updHours))
        return updHours
    }

    function reinitUpdHours(updHours){
        let newUpdHours = [...updHours]
        console.log('reservedSessions', reservedSessions)
        updHours.forEach(hour=>{
            let isReserved = false
            if(reservedSessions.length===0 && hour.className!== 'past'){
                newUpdHours = updateHoursClassname(newUpdHours, hour.id, "free")               
            }
            reservedSessions.forEach(session=>{
                // console.log('session ', session.msStart <= hour.msTime, session.msFinish >= hour.msTime, 'hour time', hour.msTime)
                // console.log('hour start', hour.msTime, 'session start', new Date(session.msStart), new Date(session.msFinish), session.msStart<= hour.msTime, session.msFinish >=hour.msTime)
                if(session.msStart<= hour.msTime && session.msFinish >=hour.msTime){
                    console.log('reserved', hour.msTime)
                    newUpdHours = updateHoursClassname(newUpdHours, hour.id, "reserved")
                    isReserved = true
                } else if(hour.className==='init' && !isReserved ){
                    // console.log('free', hour.msTime)
                    newUpdHours = updateHoursClassname(newUpdHours, hour.id, "free")
                }
            })
        })
        for (let idx = 0; idx < newUpdHours.length; idx++) {
            try {
                if(newUpdHours[idx].className==="reserved" && newUpdHours[idx-1].className==="free"){
                    // console.log('border')
                    newUpdHours = updateHoursClassname(newUpdHours, newUpdHours[idx-1].id, "border")
                }
            } catch (error) {
                
            }
        }
        newUpdHours[newUpdHours.length-1].className = 'border'
        // setUpdHours(newUpdHours)
        dispatch(setReservedHoursUtilitiesProp('updHours', newUpdHours))
    }

    useEffect(()=>{
        console.log('useEffect updHours', updHours, reservedSessions)
        if(updHours.length===0){
            initUpdHours()
        }
        if(updHours.length > 0 && !isUpdHoursInited){
            console.log('reinit updhours')
            reinitUpdHours(updHours)
            // setIsUpdHoursInited(true)
            dispatch(setReservedHoursUtilitiesProp('isUpdHoursInited', true))
        }
    }, [updHours, isUpdHoursInited])

    function updateHoursClassname(hours, id, className){
        const idx =  hours.findIndex(hour=>hour.id===id)
        // console.log('hours', hours)
        const newUpdHours = [
            ...hours.slice(0, idx),
            {...hours[idx], className},
            ...hours.slice(idx+1)
        ]
        return newUpdHours
    }

    function resetUpdHours(){
        let newUpdHours = [...updHours]
        console.log('reset', newUpdHours)
        for (let idx = 0; idx < updHours.length; idx++) {
            if(["reserved", "past", "init"].includes(newUpdHours[idx].className)){
                console.log('reserved or past')
                continue
            } else{
                newUpdHours = updateHoursClassname(newUpdHours, newUpdHours[idx].id, 'free')
            }
        }
        for (let idx = 0; idx < newUpdHours.length; idx++) {
            try {
                if(newUpdHours[idx].className==="reserved" && newUpdHours[idx-1].className==="free"){
                    console.log('border')
                    newUpdHours = updateHoursClassname(newUpdHours, newUpdHours[idx-1].id, "border")
                }
            } catch (error) {
                
            }
        }  
        newUpdHours[newUpdHours.length-1].className = 'border'
        // setStartHour(null)
        dispatch(setReservedHoursUtilitiesProp('startHour', null))
        // setFinishHour(null) 
        dispatch(setReservedHoursUtilitiesProp('finishHour', null))
        // setUpdHours(newUpdHours)  
        dispatch(setReservedHoursUtilitiesProp('updHours', newUpdHours))   
    }

    useEffect(()=>{
        console.log('outer reset')
        // const newUpdHours = initUpdHours()
        // reinitUpdHours(newUpdHours)
        // setStartHour(null)
        // setFinishHour(null) 
    }, [outterReset])

    const reserve = async (e)=>{
        e.preventDefault()
        // setDisableConfirmBtn(true)
        console.log(startHour, finishHour)
        if(startHour && finishHour && startHour.id !== finishHour.id){
            dispatch(registerAndReserve(true))
            if(currentUser){
                // await reservationPay({auth, selectedDate, startHour, finishHour})
                await przelewyReservationPay({auth, selectedDate, startHour, finishHour, email: currentUser.email, router})
            } else{
                // dispatch(registerAndReserve(true))
                dispatch(setShowAuth({show: true, isLogin: true}))
                // document.body.style.overflow = "hidden"
            }
        } else{
            const content = startHour ? phrases[language]?.reserveMessage2 : phrases[language]?.reserveMessage
            Modal.error({
                title: phrases[language]?.reserveError,
                content,
                onOk: ()=>{}
            })
        }
        // setDisableConfirmBtn(false)
    }

    useEffect(()=>{
        if(showAuth.show){
            document.body.style.overflow = "hidden"
        } else{
            document.body.style.overflow = "auto"
        }
    }, [showAuth])

    async function getReservedSesions(){

        try {

            // const token = await auth.currentUser.getIdToken()

            const response = await axios({
                url: "/api/getreservations",
                method: "POST",
                data:{
                    day: selectedDate.day, month: selectedDate.month, year: selectedDate.year
                }
            })

            const reservations = response.data.reservations.map(reservation=>reservation._doc)

            // const data = await db.collection('reservedSessions')
            //     .where('month', '==', selectedDate.month)
            //     .where('day', '==', selectedDate.day)
            //     .where('year', '==', selectedDate.year)
            //     .get()
            // console.log('sessions', data, data.docs)
            // const sessions = data.docs.map(doc=>{
            //     // console.log(doc.data())
            //     return doc.data()
            // })
            // // console.log('sessions', sessions)

            dispatch(addReservedSession(reservations))
            return
        } catch (error) {
            console.log('error', error)
        }
    }

    // async function getPrivateReservedSessionsData(){
    //     // console.log('privateReservedSessionsData', currentUser.email)
    //     try {

    //         const token = await auth.currentUser.getIdToken()

    //         const response = await axios({
    //             url: "/api/getuserreservations",
    //             method: "POST",
    //             data:{ token }
    //         })

    //         const reservations = response.data.reservations

    //         // const data  = await db.collectionGroup('privateReservedSessionsData')
    //         //     .where("userId", "==", currentUser.userId)
    //         //     .get()
    //         // console.log('privateReservedSessionData', data)
    //         // let reservations = []
    //         // const promises = data.docs.map(doc=>{
    //         //     return doc.ref.parent.parent.get()
    //         // })
    //         // const values = await Promise.all(promises)
    //         // values.forEach(value=>{
    //         //     reservations = [...reservations, value.data()]
    //         // })
    //         // // console.log('reservations', reservations)
    //         dispatch(setUserReservations(reservations))
    //         // console.log('collections', collections)
    //     } catch (error) {
    //         console.log('error', error)
    //     }
    // }

    useEffect(()=>{
        asyncUseEffect()

        async function asyncUseEffect(){
            console.log('hours current user', currentUser)
            console.log('selected date', selectedDate)
            // if(currentUser && selectedDate){ getting reservations for 'user is required' case
            if(selectedDate && selectedDate.reinitHours && isCancelRedirect !== null){
                const date = `${moment(selectedDate.raw).format('YYYY-MM-DD')}`
                
                const isThereArr = selectedDates.filter(selected=>selected===date)
                console.log('isThereArr', isThereArr)
                if(isThereArr.length > 0){
                    //get cashed data
                    dispatch(getCashedReservedSessions())
                    //redux don't see changes in reversed sessions, so useEffect don't work out and we need to call all functions ourselves               
                    const newUpdHours = initUpdHours()
                    reinitUpdHours(newUpdHours)
                    // setStartHour(null)
                    dispatch(setReservedHoursUtilitiesProp('startHour', null))
                    // setFinishHour(null)  
                    dispatch(setReservedHoursUtilitiesProp('finishHour', null))
                    // getPrivateReservedSessionsData()  
                } else{
                    console.log('date', date)
                    initUpdHours() //loading
                    if(isCancelRedirect)
                        return
                    await getReservedSesions()
                    dispatch(addSelectedDate(date))
                }
                // if(!userReservations){
                //     console.log('NO USER RESERVATIONS', userReservations)
                //     // getPrivateReservedSessionsData()
                // }
            }
        }
    }, [currentUser, selectedDate, reservedSessions, isCancelRedirect])

    useEffect(()=>{
        const isCancelRedirect = document.location.search === '?canceled=true'
        setIsCancelRedirect(isCancelRedirect)
    }, [])

    useEffect(()=>{
        if(isCancelRedirect && currentUser)
            cancelReservations()

        async function cancelReservations(){
            const token = await auth.currentUser.getIdToken()

            await axios({
                url: "/api/cancelreservations",
                method: "POST",
                data: {token}
            })

            setIsCancelRedirect(false)
        }
    }, [isCancelRedirect, auth, currentUser])

    // useEffect(()=>{
    //     // if(selectedDate.reinitHours){
    //         console.log('new reserved sessions')
    //         const newUpdHours = initUpdHours()
    //         reinitUpdHours(newUpdHours)
    //         // setStartHour(null)
    //         // dispatch(setReservedHoursUtilitiesProp('startHour', null))
    //         // setFinishHour(null) 
    //         // dispatch(setReservedHoursUtilitiesProp('finishHour', null))
    //     // }
     
    // }, [reservedSessions])

    const onClick = (e)=>{

        const id = e.target.dataset.id
        const clickedHour = updHours.find(hour=>hour.id===id)
        if(clickedHour.className==='init')
            return

        dispatch(editSelectedDate(false))

        let newUpdHours = [...updHours]

        // updHours.forEach(hour=>{
        //     if(hour.className !== "reserved")
        //         newUpdHours = updateHoursClassname(newUpdHours, hour.id, "free")
        // })
        console.log(e.target)

        console.log('newUpdHours', newUpdHours, id)

        if(startHour && startHour.id===id){
            return resetUpdHours()
        }

        const clickedHourIndex = updHours.findIndex(hour=>hour.id===id)
        console.log('clicked', clickedHour)
        if(!clickedHour)
            return
        const className = clickedHour.className
        console.log('start hour', startHour)
        if(['reserved', 'past', "border", "noaccess", "init"].includes(className)){
            console.log('denied')
            if(className==='border'){
                Modal.error({
                    title: phrases[language]?.reserveError,
                    content: phrases[language]?.reserveMessage3,
                    onOk: ()=>{}
                })
            }
            return
        }

        let isReservedMet = false
        if(!startHour){
            // setStartHour(updHours.find(hour=>hour.id===id))
            dispatch(setReservedHoursUtilitiesProp('startHour', updHours.find(hour=>hour.id===id)))
            // newUpdHours = updateHoursClassname(newUpdHours, id, 'start')
        }
        if(startHour && !finishHour){
            // setFinishHour(updHours.find(hour=>hour.id===id))
            dispatch(setReservedHoursUtilitiesProp('finishHour', updHours.find(hour=>hour.id===id)))
            // newUpdHours = updateHoursClassname(newUpdHours, id, 'finish')
        }

        if(startHour){
            // setFinishHour(updHours.find(hour=>hour.id===id))
            dispatch(setReservedHoursUtilitiesProp('finishHour', updHours.find(hour=>hour.id===id)))
        }

        for (let idx = 0; idx < updHours.length; idx++) {
            if(!startHour){
                console.log('there is no start hour')
                if(newUpdHours[idx].className==="reserved" && clickedHourIndex < idx && !isReservedMet){
                    isReservedMet = true
                }
                // if(["reserved", "past", "border"].includes(newUpdHours[idx].className)){
                //     continue
                // }
                if(clickedHourIndex===idx){
                    newUpdHours = updateHoursClassname(newUpdHours, newUpdHours[idx].id, 'start')
                    continue
                }
                if(clickedHourIndex > idx && newUpdHours[idx].className==="free"){
                    newUpdHours = updateHoursClassname(newUpdHours, newUpdHours[idx].id, 'noaccess')
                    continue
                }
                if(clickedHourIndex < idx && newUpdHours[idx].className==="free" && !isReservedMet){
                    newUpdHours = updateHoursClassname(newUpdHours, newUpdHours[idx].id, 'possible')
                    continue
                }
                if(clickedHourIndex < idx && newUpdHours[idx].className==="border" && !isReservedMet){
                    newUpdHours = updateHoursClassname(newUpdHours, newUpdHours[idx].id, 'possible')
                    continue
                }
                if(clickedHourIndex < idx && newUpdHours[idx].className==="border" && isReservedMet){
                    newUpdHours = updateHoursClassname(newUpdHours, newUpdHours[idx].id, 'noaccess')
                    continue
                }
                if(clickedHourIndex > idx && newUpdHours[idx].className==="border" ){
                    newUpdHours = updateHoursClassname(newUpdHours, newUpdHours[idx].id, 'noaccess')
                    continue
                }
                if(clickedHourIndex < idx && newUpdHours[idx].className==="free" && isReservedMet){
                    newUpdHours = updateHoursClassname(newUpdHours, newUpdHours[idx].id, 'noaccess')
                    continue
                }
            } else if(!finishHour){
                console.log('there is a start hour')
                if(clickedHourIndex > idx && newUpdHours[idx].className==="possible" ){
                    console.log('middle')
                    newUpdHours = updateHoursClassname(newUpdHours, newUpdHours[idx].id, 'middle')
                    continue
                }
                if(clickedHourIndex === idx && newUpdHours[idx].className==="possible" ){
                    console.log('finish')
                    newUpdHours = updateHoursClassname(newUpdHours, newUpdHours[idx].id, 'finish')
                    continue
                }
                
                // if(clickedHourIndex < idx && newUpdHours[idx].className==="possible" ){
                //     newUpdHours = updateHoursClassname(newUpdHours, newUpdHours[idx].id, 'noaccess')
                //     continue
                // }
            } else{
                if(clickedHourIndex === idx && newUpdHours[idx].className==="middle" ){
                    newUpdHours = updateHoursClassname(newUpdHours, newUpdHours[idx].id, 'finish')
                    continue
                } 
                if(clickedHourIndex === idx && newUpdHours[idx].className==="possible" ){
                    newUpdHours = updateHoursClassname(newUpdHours, newUpdHours[idx].id, 'finish')
                    continue
                }
                if(clickedHourIndex < idx && ["finish", "middle"].includes(newUpdHours[idx].className)){
                    newUpdHours = updateHoursClassname(newUpdHours, newUpdHours[idx].id, 'possible')
                    continue
                }
                if(clickedHourIndex > idx && ["possible", "middle", "finish"].includes(newUpdHours[idx].className)){
                    newUpdHours = updateHoursClassname(newUpdHours, newUpdHours[idx].id, 'middle')
                    continue
                }                
            }
        }
         //else{
            // if(clickedHour.msTime - startHour.msTime > 0){
            //     newUpdHours = updateHoursClassname(newUpdHours, id, 'finish')
            // } else if(clickedHour.msTime - startHour.msTime < 0){
            //     newUpdHours = updateHoursClassname(newUpdHours, startHour.id, 'finish')
            //     newUpdHours = updateHoursClassname(newUpdHours, id, 'start')
            //     setStartHour(clickedHour)
            // } else{
            //     newUpdHours = updateHoursClassname(newUpdHours, id, 'session')
            // }
        //} 
        // else if(!finishHour){
        //     if(clickedHour.msTime - startHour.msTime > 0){
        //         console.log('new upd hours before finish hour', newUpdHours)
        //         newUpdHours = updateHoursClassname(newUpdHours, id, 'finish')
        //         console.log('new upd hours after finish hour', newUpdHours)
        //         setFinishHour(clickedHour)
        //     } else if(clickedHour.msTime - startHour.msTime < 0){
        //         newUpdHours = updateHoursClassname(newUpdHours, startHour.id, 'finish')
        //         newUpdHours = updateHoursClassname(newUpdHours, id, 'start')
        //         setFinishHour(startHour)
        //         setStartHour(clickedHour)
        //     } else{
        //         newUpdHours = updateHoursClassname(newUpdHours, id, 'session')
        //     }
        // } else{ //we have got start and finish hours
        //     if(clickedHour.msTime > startHour.msTime){
        //         newUpdHours = updateHoursClassname(newUpdHours, finishHour.id, 'free')
        //         newUpdHours = updateHoursClassname(newUpdHours, clickedHour.id, 'finish')
        //         setStartHour(clickedHour)
        //     } else if(clickedHour.msTime < finishHour.msTime){
        //         newUpdHours = updateHoursClassname(newUpdHours, startHour.id, 'free')
        //         newUpdHours = updateHoursClassname(newUpdHours, clickedHour.id, 'start')
        //         setFinishHour(clickedHour)
        //     }
        // }

        //set middle classnames
        // if(startHour){
        //     if(newUpdHours[clickedHourIndex].className==='start'){
        //         const finishHourIdx = newUpdHours.findIndex(hour=>hour.className==='finish')
        //         console.log('newupdHours', newUpdHours)
        //         let isFinishHourChanged = false
        //         for (let idx = clickedHourIndex + 1; idx <= finishHourIdx; idx++) {
        //             console.log("idx finishIdx hour isFinishHourChaged", idx, finishHourIdx, newUpdHours[idx], isFinishHourChanged)
        //             if(newUpdHours[idx].className==="reserved" && !isFinishHourChanged){
        //                 newUpdHours = updateHoursClassname(newUpdHours, newUpdHours[idx-1].id, "finish")
        //                 isFinishHourChanged = true
        //             } else if((newUpdHours[idx].className==="middle" || newUpdHours[idx].className==="finish") && isFinishHourChanged){
        //                 newUpdHours = updateHoursClassname(newUpdHours, newUpdHours[idx].id, "free")
        //             } else if(!isFinishHourChanged && newUpdHours[idx].className==="free"){
        //                 newUpdHours = updateHoursClassname(newUpdHours, newUpdHours[idx].id, "middle")
        //             }
        //         }
        //     } else{
        //         const startHourIdx = newUpdHours.findIndex(hour=>hour.className==='start')
        //         let isStartHourChanged = false
        //         for (let idx = clickedHourIndex - 1; idx >= startHourIdx; idx--) {
        //             if(newUpdHours[idx].className==="reserved" && !isStartHourChanged){
        //                 newUpdHours = updateHoursClassname(newUpdHours, newUpdHours[idx+1].id, "start")
        //                 isStartHourChanged = true
        //             } else if((newUpdHours[idx].className==="middle" || newUpdHours[idx].className==="start") && isStartHourChanged){
        //                 newUpdHours = updateHoursClassname(newUpdHours, newUpdHours[idx].id, "free")
        //             } else if(!isStartHourChanged && newUpdHours[idx].className==="free"){
        //                 newUpdHours = updateHoursClassname(newUpdHours, newUpdHours[idx].id, "middle")
        //             }
        //         }
        //     }
        // }

        // setUpdHours(newUpdHours)
        dispatch(setReservedHoursUtilitiesProp('updHours', newUpdHours))   

        // console.log(e.target.dataset.id)
        // const selectedIdx = selectedHours.findIndex(hour=>{
        //     console.log(hour.hourId, e.target.dataset.id, selectedDate.day, hour.day, selectedDate.month, hour.month, selectedDate.year, hour.year)
        //     return (hour.hourId===e.target.dataset.id 
        //         && selectedDate.day===hour.day 
        //         && selectedDate.month===hour.month 
        //         && selectedDate.year===hour.year) 
        // })
        // if(selectedIdx === -1){
        //     dispatch(addSelectedHour(e.target.dataset.id))
        // } else{
        //     dispatch(removeSelectedHour(selectedIdx))
        // }

        // //find clicked hour
        // const id = e.target.dataset.id
        // const idx = hours.findIndex(hour=>hour.id===id)
        // const {year, month, day} = selectedDate
        // const clickedHour = {
        //     ...hours[idx],
        //     msTime: +new Date(year, month-1, day, hours[idx].hours, hours[idx].minutes),
        //     idx
        // }
        // console.log('clicked hour', clickedHour)

        // //set start and finish hour
        // if(!startHour){
        //     setStartHour(clickedHour)
        // } else{
        //     const msDifference = clickedHour.msTime - startHour.msTime
        //     if(msDifference >= 0){
        //         let newMiddleHours = []
        //         for (let index = clickedHour.idx - 1; index > startHour.idx; index--) {
        //             const msMiddle = +new Date(selectedDate.year, selectedDate.month, selectedDate.day, hours[index].hours, hours[index].minutes)
        //             //find if hour is located in reserved sessions
        //             const reservedSession =  reservedSessions.find(session => session.msFinish === msMiddle)
        //             console.log('reserved session', reservedSession)
        //             if(reservedSession){
        //                 const newStartHour = {
        //                     ...hours[index+1],
        //                     msTime: msMiddle,
        //                     idx: index
        //                 }
        //                 console.log('new start hour', newStartHour)
        //                 setStartHour(newStartHour)
        //                 return
        //             } else{
        //                 const middle = {
        //                     ...hours[index],
        //                     msTime: msMiddle,
        //                     idx: index
        //                 }
        //                 newMiddleHours = [...newMiddleHours, middle]
        //                 console.log('new middle hours', newMiddleHours)
        //             }                 
        //         }
        //         setMiddleHours(newMiddleHours)
        //         setFinishHour(clickedHour)
        //     } else{
        //         setStartHour(clickedHour)
        //         setFinishHour(startHour)
        //     }
        // }

        // console.log('start hour', startHour)
        // console.log('finish hour', finishHour)
    }

    function isHourAvailable(hour){
        const {year, month, day} = selectedDate
        // const msHour = +new Date(year, month-1, day, hour.hours, hour.minutes)
        const msHour = moment([year, Number(month)-1, day, hour.hours, hour.minutes]).utcOffset(utcOffset, true).valueOf()
        const dateNow = +new Date()
        return ( dateNow + 1*60*60*1000 - msHour <= 0)
    }

    useEffect(()=>{
        const availableHours = hours.filter(hour=>isHourAvailable(hour))
    }, [selectedDate])

    function getBoardString(){
        const start = startHour? `${startHour.title}`: ''
        const finish = finishHour && finishHour.title !== startHour.title ? `${finishHour.title}`: ''
        return `${start?? null} ${finish? '-': ''} ${finish ?? ''}`
    }

    function getBoardResult(){
        if(startHour && finishHour && startHour.title !== finishHour.title){
            const msDuration = finishHour.msTime - startHour.msTime
            const hours = msDuration / 1000 / 60 / 60
            console.log('msDuration', msDuration, hours)
            return `${hours}H`
        }
        return ''
    }

    function getPriceResult(){
        const hourPrice = 100
        if(startHour && finishHour && startHour.title !== finishHour.title){
            const msDuration = finishHour.msTime - startHour.msTime
            const hours = msDuration / 1000 / 60 / 60
            return hours * hourPrice
        }
        return ''
    }

    return (
        <div className={styles.hoursWrapper}>
            <div className={styles.top}>
                <div className={styles.board}>
                    <div className={styles.boardString}
                        style={{maxWidth: 
                            (windowWidth<=800) ? 'none' :
                            (windowWidth<=1024 && router.pathname==='/konto/rezerwacja') ? '470px' :
                            (windowWidth<=1330 && router.pathname==='/konto/rezerwacja') ? '550px' : 
                            '390px'
                        }}
                    >
                        <div>{getBoardString()}</div>
                        <div className={styles.boardResult}>{getBoardResult()}</div>
                    </div>
                </div>
                <div className={styles.hours}
                    style={{maxWidth:                         
                        (windowWidth<=800) ? '570px' :
                        (windowWidth<=1024 && router.pathname==='/konto/rezerwacja') ? '470px' :
                        (windowWidth<=1330 && router.pathname==='/konto/rezerwacja') ? '550px' : 
                        '390px'
                    }}
                >
                    {updHours && updHours.map(hour=>(
                        <div key={hour.id}  className={styles[hour.className]} onClick={onClick}>
                            <div  
                                className={styles.hour} data-id={hour.id}
                            >
                                {hour.title}
                            </div>  
                        </div>              
                    ))}
                </div>  
            </div>
            <div className={styles.bottom}>
                {getPriceResult() > 0 && <div className={styles.price}>
                    <div className={styles.title}>Cena:</div>
                    <div className={styles.result}>{` ${getPriceResult()}z?? netto`}</div>
                </div>}
                <div className={styles.btns}
                    style={{maxWidth: 
                        (windowWidth<=800) ? 'none' :
                        (windowWidth<=1200 && router.pathname==='/konto/rezerwacja') ? 'none' :
                        (windowWidth<=1330 && router.pathname==='/konto/rezerwacja') ? '550px' : 
                        '390px'
                    }}
                >
                    <button 
                        className={styles.reserveBtn} 
                        onClick={reserve} 
                        disabled={disableConfirmBtn}
                        style={{maxWidth: 
                            (windowWidth<=800) ? 'none' :
                            (windowWidth<=1200 && router.pathname==='/konto/rezerwacja') ? 'none' :
                            (windowWidth<=1330 && router.pathname==='/konto/rezerwacja') ? '550px' : 
                            '390px'
                        }}
                    >
                        { disableConfirmBtn ?<LoadingOutlined style={{color: "black"}}/> : buttonNames[language]?.reserve}
                    </button>
                    <button 
                        className={styles.cancelBtn} 
                        onClick={resetUpdHours}
                        style={{maxWidth: 
                            (windowWidth<=800) ? 'none' :
                            (windowWidth<=1200 && router.pathname==='/konto/rezerwacja') ? 'none' :
                            (windowWidth<=1330 && router.pathname==='/konto/rezerwacja') ? '550px' : 
                            '390px'
                        }}
                    >
                        {buttonNames[language]?.cancel}
                    </button>
                </div> 
            </div>
            
            
            {/* <YourReservation/> */}
        </div>
        
    )
}

export default Hours
