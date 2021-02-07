import React from 'react'
import styles from '../../styles/Hiring.module.scss'
import { useSelector, useDispatch } from 'react-redux'
import ProgressBar from './progress-bar'
import HiringChoice from './hiring-choice'
import Sidebar from '../side-bar'
import { setShowAuth } from '../../redux/actions'
import Link from 'next/link'
import Price from './price'

function Rightbar() {

    const hiringChoices = useSelector(state=>state.hiringChoices)
    const currentUser = useSelector(state=>state.currentUser)

    const dispatch = useDispatch()

    function login(){
        const body = document.querySelector("body")
        body.style.overflow = "hidden"
        dispatch(setShowAuth(true))
    }

    return (
        <div className={styles.rightBarWrapper}>
            <div className={styles.rightBarTop}>
                {currentUser === false && <button className={styles.rightBarTopBtn} onClick={login}>zaloguj sie</button>}
                {currentUser && <div className={styles.profilBtn}>
                    <Link  href="/konto/profil"><a>Profil</a></Link>
                </div>}
            </div>
            <div className={styles.rightbar}>
                <Sidebar/>
                <ProgressBar/>
                <div className={styles.rightBarTitle}>Podsumowanie:</div>
                <div className={styles.hiringChoicesDiv}>
                    {hiringChoices.map((choice, idx)=>(
                        <HiringChoice idx={idx} {...choice} key={idx}/>
                    ))}
                </div>
                <Price/>
            </div> 
        </div>
        
    )
}

export default Rightbar
