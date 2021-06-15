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
import Sidebar from '../../components/side-bar'
import { phrases } from '../../accessories/constants'

function MojeRezerwacje({auth, db}) {

    const language = useSelector(state=>state.language)

    return (
        <div className={styles.pakiet} style={{display: language? 'block': 'none'}}>
            <ProfileBoilerplate  auth={auth} db={db}>
                <Sidebar color='#4CAED5' auth={auth}/>
                <div className={styles.title}> <span className={styles.bold}>{phrases[language]?.myReservations}</span></div>
                <div className={styles.text}>
                    <div className={styles.small}>{phrases[language]?.packDescription4}</div>
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
