import React, { useEffect, useState } from 'react'
import {useDispatch} from 'react-redux' 
import styles from '../styles/YourReservation.module.scss'
import { useSelector } from 'react-redux'
import { setUserReservations } from '../redux/actions'
import axios from 'axios'
import { Skeleton } from 'antd'
import { phrases } from '../accessories/constants'

function YourReservation({auth}) {

    const reservations = useSelector(state=>state.userReservations)
    const currentUser = useSelector(state=>state.currentUser)
    const language = useSelector(state=>state.language)
    const [viewed, setViewed] = useState(null)
    const dispatch = useDispatch()

    const skeletonBtn =  <Skeleton.Button active={true} size="small" style={{marginTop: '2px'}}/>
    const skeletonInput = <Skeleton.Input style={{ width: 250, marginTop: '2px', marginLeft: '30px' }} active={true} size="small" />

    async function getPrivateReservedSessionsData(){
        try {

            const token = await auth.currentUser.getIdToken()

            const response = await axios({
                url: "/api/getuserreservations",
                method: "POST",
                data:{ token }
            })

            const reservations = response.data.reservations
            dispatch(setUserReservations(reservations))
        } catch (error) {
            console.log('error', error)
        }
    }

    useEffect(()=>{
        if(currentUser){
            console.log('currentUser', currentUser)
            getPrivateReservedSessionsData()
        }
    }, [currentUser])

    useEffect(()=>{
        if(reservations){
            console.log('reservations', reservations)
            const now = +new Date()
            const filtered = reservations.filter(reservation=>{
                const msStart = reservation.startHour?.msTime ?? 0
                return msStart-now >= 0
            })
            const sorted = filtered.sort((a, b)=>{
                return a.startHour.msTime - b.startHour.msTime
            })
            setViewed(sorted)
        }
    }, [reservations])

    return (
        <div className={styles.yourReservation}>
            <div className={styles.title}>{phrases[language].yourReservations}</div>
            {viewed && viewed.map(({year, month, day, startHour, finishHour, code}, idx)=>{
                return(
                    <div className={styles.reservation} key={idx}>
                        <div className={styles.left}>
                            {`${day}/${month}/${year}`}
                        </div>
                        <div className={styles.right}>
                            {`${startHour?.title} - ${finishHour?.title}, ${phrases[language].yourReservations} ${code}`}
                        </div>
                    </div>
                )                
            })}
            {viewed===null && [0, 1, 2].map((record, idx)=>(
                <div className={styles.row}>
                    <div className={styles.firstRow}>{skeletonBtn}</div>
                    <div className={styles.secondRow}>{skeletonInput}</div>
                </div>
            ))}
        </div>
    )
}

export default YourReservation
