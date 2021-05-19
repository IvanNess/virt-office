import React from 'react'
import styles from '../../styles/Dane.module.scss'

import ProfileBoilerplate from '../../components/profile-boilerplate'
import Calendar from '../calendar'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { setCalendarRedirect } from '../../redux/actions'
import Sidebar from '../../components/side-bar'

function Rezervacja({db, auth}) {

    const dispatch = useDispatch()
    const calendarRedirect = useSelector(state=>state.calendarRedirect)

    useEffect(()=>{
        if(calendarRedirect)
            dispatch(setCalendarRedirect(false))
    }, [calendarRedirect])

    return (
        <div className={styles.dane}>
            <ProfileBoilerplate  auth={auth} db={db}>
                <Sidebar color='#4CAED5'/>
                <div className={styles.title}>4. <span className={styles.bold}>Rezerwacja Biura</span></div>
                <div className={styles.text}>
                    <div className={styles.small}>Wpisz nazwę lub kod pocztowy miasta, w którym chcesz wybrać adres firmy. Dostępne adresy i miesięczny koszt wyświetlą się poniżej.</div>
                </div>
                <Calendar db={db} auth={auth}/>
            </ProfileBoilerplate>       
        </div>
    )
}

export default Rezervacja
