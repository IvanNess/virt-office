import React from 'react'
import styles from '../../styles/Dane.module.scss'

import ProfileBoilerplate from '../../components/profile-boilerplate'
import Calendar from '../calendar'

function Rezervacja({db, auth}) {
    return (
        <div className={styles.dane}>
            <ProfileBoilerplate  auth={auth} db={db}>
                <div className={styles.title}>5. <span className={styles.bold}>Rezerwacja Biura</span></div>
                <div className={styles.text}>
                    <div className={styles.small}>Wpisz nazwę lub kod pocztowy miasta, w którym chcesz wybrać adres firmy. Dostępne adresy i miesięczny koszt wyświetlą się poniżej.</div>
                </div>
                <Calendar db={db} auth={auth}/>
            </ProfileBoilerplate>       
        </div>
    )
}

export default Rezervacja
