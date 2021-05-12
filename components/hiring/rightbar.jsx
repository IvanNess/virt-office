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
import { LoadingOutlined } from '@ant-design/icons'

function Rightbar({db, auth}) {

    const hiringChoices = useSelector(state=>state.hiringChoices)
    const hiringChoiceNumber = useSelector(state=>state.hiringChoiceNumber)
    const currentUser = useSelector(state=>state.currentUser)
    const showAuth = useSelector(state=>state.showAuth)
    const payAfterRegister = useSelector(state=>state.payAfterRegister)
    const [btnDisabled, setBtnDisabled] = useState(false)

    const dispatch = useDispatch()

    useEffect(()=>{
        if(!showAuth.show && (!currentUser || !(currentUser && payAfterRegister))){
            setBtnDisabled(false)
        }
    }, [showAuth, currentUser, payAfterRegister])

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
        <div className={hiringChoiceNumber===1 ? styles.rightBarWrapper : styles.vh100RightBarWrapper }>
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
                    <div className={styles.nextBtnWrapper}>
                        <button className={styles.nextBtn} onClick={nextClicked} disabled={btnDisabled}>
                            Dalej
                        </button>
                    </div>
                }
                {hiringChoices[1].isComplete && hiringChoiceNumber===2 && currentUser &&
                    <div className={styles.nextBtnWrapper}>
                        <div className={styles.priceDiv}><span className={styles.priceLeft}>Cena:</span>{`${hiringChoices[1].fullPrice}zł`}</div>
                        <button className={styles.nextBtn} onClick={pay} disabled={btnDisabled}>
                            {!btnDisabled && `Zaplać`}
                            {btnDisabled && <LoadingOutlined style={{color: "white"}}/>}
                        </button>
                    </div>
                    
                }
                {hiringChoices[1].isComplete && hiringChoiceNumber===2 && !currentUser &&
                    <div className={styles.nextBtnWrapper}>
                        <div className={styles.priceDiv}><span className={styles.priceLeft}>Cena:</span>{`${hiringChoices[1].fullPrice}zł`}</div>
                        <button className={styles.nextBtn} onClick={loginAndPay} disabled={btnDisabled}>
                            {!btnDisabled && `Zaloguj się i zaplać`}
                            {btnDisabled && <LoadingOutlined style={{color: "white"}}/>}
                        </button>
                    </div>
                }
                <Price db={db} auth={auth}/>
            </div> 
        </div>
        
    )
}

export default Rightbar
