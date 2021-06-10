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
import { packagePay, przelewyPackagePay } from '../../utilities'
import { LoadingOutlined } from '@ant-design/icons'
import useWindowWidth from '../../hooks/useWindowWidth'
import { useRouter } from 'next/router'
import Logo from '../logo'
import { phrases, buttonNames } from '../../accessories/constants'

function Rightbar({db, auth}) {

    const hiringChoices = useSelector(state=>state.hiringChoices)
    const hiringChoiceNumber = useSelector(state=>state.hiringChoiceNumber)
    const currentUser = useSelector(state=>state.currentUser)
    const showAuth = useSelector(state=>state.showAuth)
    const language = useSelector(state=>state.language)
    const payAfterRegister = useSelector(state=>state.payAfterRegister)
    const [btnDisabled, setBtnDisabled] = useState(false)

    const [sideBarColor, setSideBarColor] = useState('white')
    const windowWidth = useWindowWidth()
    const router = useRouter()

    const dispatch = useDispatch()

    useEffect(()=>{
        if(router.pathname==='/wynajecie' && windowWidth <= 1124){
            setSideBarColor('#4CAED5')
        } else{
            setSideBarColor('white')
        }
    }, [windowWidth])

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
        // await packagePay({auth, hiringChoices, email: currentUser.email})
        await przelewyPackagePay({auth, hiringChoices, email: currentUser.email, router})

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
                <div className={styles.logo}><Logo color='#121109' hovColor='#03b2cb' scale={0.6}/></div>
                {currentUser === false && <button className={styles.rightBarTopBtn} onClick={login}>
                    {buttonNames[language]?.login}
                </button>}
                {currentUser && <div className={styles.profilBtn}>
                    <Link  href="/konto/profil"><a>{buttonNames[language]?.profil}</a></Link>
                </div>}
            </div>
            <div className={styles.rightbar}>
                <Sidebar color={sideBarColor}/>
                <ProgressBar/>
                <div className={language==='ua'? styles.uaRightBarTitle :styles.rightBarTitle}>
                    {phrases[language]?.sum}
                </div>
                <div className={styles.hiringChoicesDiv}>
                    {hiringChoices.map((choice, idx)=>(
                        <HiringChoice idx={idx} {...choice} key={idx} language={language}/>
                    ))}
                </div>
                {hiringChoices[0].isComplete && hiringChoiceNumber===1 &&
                    <div className={styles.nextBtnWrapper}>
                        <button className={styles.nextBtn} onClick={nextClicked} disabled={btnDisabled}>
                            {buttonNames[language]?.next}
                        </button>
                    </div>
                }
                {hiringChoices[1].isComplete && hiringChoiceNumber===2 && currentUser &&
                    <div className={styles.nextBtnWrapper}>
                        <div className={styles.priceDiv}><span className={styles.priceLeft}>
                            {phrases[language]?.price}
                        </span>{`${hiringChoices[1].fullPrice}zł`}</div>
                        <button className={styles.nextBtn} onClick={pay} disabled={btnDisabled}>
                            {!btnDisabled && buttonNames[language]?.pay}
                            {btnDisabled && <LoadingOutlined style={{color: "white"}}/>}
                        </button>
                    </div>
                    
                }
                {hiringChoices[1].isComplete && hiringChoiceNumber===2 && !currentUser &&
                    <div className={styles.nextBtnWrapper}>
                        <div className={styles.priceDiv}><span className={styles.priceLeft}>
                            {phrases[language]?.price}
                        </span>{`${hiringChoices[1].fullPrice}zł`}</div>
                        <button className={styles.nextBtn} onClick={loginAndPay} disabled={btnDisabled}>
                            {!btnDisabled && buttonNames[language]?.loginAndPay}
                            {btnDisabled && <LoadingOutlined style={{color: "white"}}/>}
                        </button>
                    </div>
                }
                {/* <Price db={db} auth={auth}/> */}
            </div> 
        </div>
        
    )
}

export default Rightbar
