import React, { useEffect, useState } from 'react'

import styles from '../styles/YourReservation.module.scss'
import { useSelector } from 'react-redux'

function YourReservation() {

    const reservations = useSelector(state=>state.userReservations)
    const [viewed, setViewed] = useState([])

    useEffect(()=>{
        if(reservations){
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
            <div className={styles.title}>Twoje rezerwacje</div>
            {viewed.map(({year, month, day, startHour, finishHour, code})=>{
                return(
                    <div className={styles.reservation}>
                        <div className={styles.left}>
                            {`${day}/${month}/${year}`}
                        </div>
                        <div className={styles.right}>
                            {`${startHour?.title}, kod dostępu: ${code}`}
                        </div>
                    </div>
                )
                
            })}
        </div>
    )
}

export default YourReservation
