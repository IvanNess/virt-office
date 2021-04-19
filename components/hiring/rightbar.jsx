import React from 'react'
import styles from '../../styles/Hiring.module.scss'
import { useSelector, useDispatch } from 'react-redux'
import ProgressBar from './progress-bar'
import HiringChoice from './hiring-choice'
import Sidebar from '../side-bar'
import { setShowAuth, setHiringChoiceNumber, setPayAfterRegister, updateHiringChoice } from '../../redux/actions'
import Link from 'next/link'
import Price from './price'
import { useEffect, useState } from 'react'
import { packagePay } from '../../utilities'

function Rightbar({db, auth}) {

    const hiringChoices = useSelector(state=>state.hiringChoices)
    const hiringChoiceNumber = useSelector(state=>state.hiringChoiceNumber)
    const currentUser = useSelector(state=>state.currentUser)
    const showAuth = useSelector(state=>state.showAuth)
    const [btnDisabled, setBtnDisabled] = useState(false)

    const dispatch = useDispatch()

    useEffect(()=>{
        if(!showAuth.show){
            setBtnDisabled(false)
        }
    }, [showAuth])

    function login(){
        const body = document.querySelector("body")
        body.style.overflow = "hidden"
        dispatch(setShowAuth({show: true}))
    }

    function nextClicked(){
        dispatch(setHiringChoiceNumber(2))
    }

    async function pay(){
        setBtnDisabled(true)
        console.log('pay')
        await packagePay({auth, hiringChoices})
    }

    function loginAndPay(){
        setBtnDisabled(true)
        dispatch(setPayAfterRegister(true))
        dispatch(setShowAuth({show: true}))
        document.body.style.overflow = "hidden"
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
                {hiringChoices[0].isComplete && hiringChoiceNumber===1 &&
                    <button className={styles.nextBtn} onClick={nextClicked} disabled={btnDisabled}>
                        Dalej
                    </button>
                }
                {hiringChoices[1].isComplete && hiringChoiceNumber===2 && currentUser &&
                    <button className={styles.nextBtn} onClick={pay} disabled={btnDisabled}>
                        {`Zaplać (${hiringChoices[1].fullPrice} zł)`}
                    </button>
                }
                {hiringChoices[1].isComplete && hiringChoiceNumber===2 && !currentUser &&
                    <button className={styles.nextBtn} onClick={loginAndPay} disabled={btnDisabled}>
                        {`Zaloguj się i zaplać (${hiringChoices[1].fullPrice} zł)`}
                    </button>
                }
                <Price db={db} auth={auth}/>
            </div> 
        </div>
        
    )
}

export default Rightbar
