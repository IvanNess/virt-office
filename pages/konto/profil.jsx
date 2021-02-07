import React, { useEffect, useState } from 'react'
import styles from '../../styles/Profile.module.scss'

import ProfileBoilerplate from '../../components/profile-boilerplate'
import AuthBoilerplate from '../../components/auth-boilerplate'
import { useDispatch, useSelector } from 'react-redux'
import { editCurrentUser } from '../../redux/actions'

function Profile({auth, db}) {

    return (
        <div className={styles.profile}>
            <ProfileBoilerplate auth={auth} db={db}>
                <div className={styles.title}>1. <span className={styles.bold}>Mój Profil</span></div>
                <div className={styles.text}>
                    <div className={styles.small}>Wpisz nazwę lub kod pocztowy miasta, w którym chcesz wybrać adres firmy. Dostępne adresy i miesięczny koszt wyświetlą się poniżej.</div>
                </div>

                <form action="">
                    <input className={styles.login} type="text" placeholder="Login" value="" disabled={false}/>
                    <input className={styles.adress} type="text" placeholder="Adres email" value="" disabled={false}/>
                    <input className={styles.firm} type="text" placeholder="Nazwa Firmy" value="" disabled={false}/>
                    <input className={styles.buttonInput} type="button" value="ZAPISZ"/>
                </form>

                <div className={styles.changeLogin}>
                    <div className={styles.smallTitle}>Zmień hasło:</div>
                    <form>
                        <div className={styles.twoColumns}>
                            <input className={styles.password} type="password" placeholder="Nowe Hasło"/>
                            <input className={styles.repeat} type="password" placeholder="Powtórz nowe hasło"/> 
                        </div>
                        <input className={styles.buttonInput} type="button" value="ZAPISZ"/>
                    </form>
                </div>

            </ProfileBoilerplate>                       
        </div>
    )
}

export default Profile
