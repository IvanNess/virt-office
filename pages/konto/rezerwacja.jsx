import React from 'react'
import styles from '../../styles/Dane.module.scss'

import ProfileBoilerplate from '../../components/profile-boilerplate'
import Calendar from '../calendar'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { setCalendarRedirect } from '../../redux/actions'
import Sidebar from '../../components/side-bar'
import { phrases } from '../../accessories/constants'
import ReservationDescription from '../../components/konto/rezerwacja-description'

function Rezervacja({db, auth}) {

    const dispatch = useDispatch()
    const calendarRedirect = useSelector(state=>state.calendarRedirect)
    const language = useSelector(state=>state.language)

    useEffect(()=>{
        if(calendarRedirect)
            dispatch(setCalendarRedirect(false))
    }, [calendarRedirect])

    return (
        <div className={styles.dane} style={{display: language? 'block': 'none'}}>
            <ProfileBoilerplate  auth={auth} db={db}>
                <Sidebar color='#4CAED5' auth={auth}/>
                <div className={styles.title}>4. <span className={styles.bold}>{phrases[language]?.rezerwacja}</span></div>
                <div className={styles.text}>
                    <div className={styles.small}>
                        <ReservationDescription/>
                    </div>
                </div>
                <Calendar db={db} auth={auth}/>
            </ProfileBoilerplate>       
        </div>
    )
}

export default Rezervacja
