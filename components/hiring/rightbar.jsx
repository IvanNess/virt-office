import React from 'react'
import styles from '../../styles/Hiring.module.scss'
import { useSelector, useDispatch } from 'react-redux'
import ProgressBar from './progress-bar'
import HiringChoice from './hiring-choice'
import Sidebar from '../side-bar'
import { setShowAuth } from '../../redux/actions'

function Rightbar() {

    const hiringChoices = useSelector(state=>state.hiringChoices)

    const dispatch = useDispatch()

    function login(){
        const body = document.querySelector("body")
        body.style.overflow = "hidden"
        dispatch(setShowAuth(true))
    }

    return (
        <div className={styles.rightBarWrapper}>
            <div className={styles.rightBarTop}>
                <button className={styles.rightBarTopBtn} onClick={login}>zaloguj sie</button>
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
                
            </div> 
        </div>
        
    )
}

export default Rightbar
