import React, { useEffect, useState } from 'react'
import styles from '../../styles/Pakiet.module.scss'

import ProfileBoilerplate from '../../components/profile-boilerplate'
import KontoPackages from '../../components/konto-packages'
import useSWR from 'swr'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import {setPackages} from '../../redux/actions'
import Sidebar from '../../components/side-bar'
import { phrases } from '../../accessories/constants'

function Pakiet({auth, db}) {

    const language = useSelector(state=>state.language)

    return (
        <div className={styles.pakiet}>
            <ProfileBoilerplate  auth={auth} db={db}>
                <Sidebar color='#4CAED5' auth={auth}/>
                <div className={styles.title}>2. <span className={styles.bold}>{phrases[language]?.pakiet}</span></div>
                <div className={styles.text}>
                    <div className={styles.small}>{phrases[language]?.pakietDescription}</div>
                </div>
                <KontoPackages auth={auth}/>
            </ProfileBoilerplate>       
        </div>
    )
}

export default Pakiet
