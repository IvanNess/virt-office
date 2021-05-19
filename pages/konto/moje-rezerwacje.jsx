import React, { useEffect, useState } from 'react'
import styles from '../../styles/Pakiet.module.scss'

import ProfileBoilerplate from '../../components/profile-boilerplate'
import KontoPackages from '../../components/konto-packages'
import useSWR from 'swr'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import {setPackages} from '../../redux/actions'
import Display from '../../components/display'
import YourReservation from '../../components/your-reservation'

function MojeRezerwacje({auth, db}) {

    return (
        <div className={styles.pakiet}>
            <ProfileBoilerplate  auth={auth} db={db}>
                <Sidebar color='#4CAED5'/>
                <div className={styles.title}> <span className={styles.bold}>Moje Rezerwacje</span></div>
                <div className={styles.text}>
                    <div className={styles.small}>Wpisz nazwę lub kod pocztowy miasta, w którym chcesz wybrać adres firmy. Dostępne adresy i miesięczny koszt wyświetlą się poniżej.</div>
                </div>
                <div className={styles.main}>
                    <div className={styles.yourReservation}><YourReservation auth={auth}/></div>
                    <div className={styles.display}><Display auth={auth} db={db}/></div>
                </div>
                
            </ProfileBoilerplate>       
        </div>
    )
}

export default MojeRezerwacje
