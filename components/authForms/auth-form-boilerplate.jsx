import React, {useState, useEffect} from 'react'

import styles from '../../styles/AuthFormBoilerplate.module.scss'
import { useSelector, useDispatch } from 'react-redux'
import { setSignupFormProp, setLoginFormProp, setShowAuth, formSubmitted, setPayAfterRegister, registerAndReserve, setForgetFormProp } from '../../redux/actions'
import { useRouter } from 'next/router'
import axios from 'axios'
import { packagePay, reservationPay, getData64FromTextImg, przelewyPackagePay, przelewyReservationPay } from '../../utilities'
import { isPossiblePhoneNumber } from 'react-phone-number-input'
import { Modal } from 'antd'
import {LoadingOutlined} from '@ant-design/icons'
import { phrases, buttonNames } from '../../accessories/constants'

function AuthFormBoilerplate({children, isLogin=false, page, db, auth}) {

    const signupForm = useSelector(state=>state.signupForm)
    const loginForm = useSelector(state=>state.loginForm)
    const forgetForm = useSelector(state=>state.forgetForm)
    const calendarRedirect = useSelector(state=>state.calendarRedirect)
    const payAfterRegister = useSelector(state=>state.payAfterRegister)
    const hiringChoices = useSelector(state=>state.hiringChoices)
    const selectedDate = useSelector(state=>state.selectedDate)
    const startHour = useSelector(state=>state.reservedHoursUtilities.startHour)
    const finishHour = useSelector(state=>state.reservedHoursUtilities.finishHour)
    const packages = useSelector(state=>state.packages)
    const language = useSelector(state=>state.language)
    const currentUser = useSelector(state=>state.currentUser)

    const [btnDisabled, setBtnDisabled] = useState(false)

    const dispatch = useDispatch()

    const router = useRouter()

    useEffect(()=>{
        asyncPayAfterRegister()
        async function asyncPayAfterRegister(){
            if(payAfterRegister && packages && packages.length === 0){
                // dispatch(setPayAfterRegister(false))
                //pay actions
                console.log('pay action')
                // await packagePay({auth, hiringChoices})
                await przelewyPackagePay({auth, hiringChoices, email: currentUser.email, router, language})
                
            } else if(payAfterRegister && packages && packages.length > 0){
                // dispatch(setPayAfterRegister(false))
                Modal.error({
                    // title: phrases[language]?.authMessage1,
                    content: phrases[language]?.authMessage2,
                    onOk: ()=>dispatch(setPayAfterRegister(false))
                })
                router.push(`/konto/${language}/pakiet`)
            }
        }
        
    }, [payAfterRegister, packages, currentUser])

    async function check(){
        console.log('check', page)
        if(isLogin){
            dispatch(setLoginFormProp('loginPlaceholder', ''))
            dispatch(setLoginFormProp('passwordPlaceholder', ''))            
            if(!loginForm.login || loginForm.login.length ===0){
                dispatch(setLoginFormProp('loginPlaceholder', phrases[language]?.requiredField))
                return
            }
            if(!loginForm.password || loginForm.password.length === 0){
                dispatch(setLoginFormProp('passwordPlaceholder', phrases[language]?.requiredField))
                // dispatch(setLoginFormProp('password', ''))
                return
            }

            try {
                await auth.signInWithEmailAndPassword(loginForm.login, loginForm.password)
                dispatch(setShowAuth({show: false}))
                const body = document.querySelector("body")
                body.style.overflow = "auto"
                // router.push('/konto/profil')
                // if(payAfterRegister){
                //     dispatch(setPayAfterRegister(false))
                //     //pay actions
                //     console.log('pay action')
                //     await packagePay({auth, hiringChoices})
                //     return
                // }
                if(selectedDate.registerAndReserve){
                    // dispatch(registerAndReserve(false))
                    // await reservationPay({auth, selectedDate, startHour, finishHour})
                    await przelewyReservationPay({auth, selectedDate, startHour, finishHour, router, language})
                    return
                }
                if(calendarRedirect)
                    return router.push(`/konto/${language}/rezerwacja`)
                // router.push('/konto/profil')
                if(!payAfterRegister){
                    router.push(`/konto/${language}/profil`)
                }
            } catch (error) {
                console.log(error)
                if(error?.message==='The password is invalid or the user does not have a password.'){
                    dispatch(setLoginFormProp('passwordPlaceholder', phrases[language]?.authMessage3))
                    return
                }
                Modal.error({
                    // title: phrases[language]?.authMessage4,
                    content: `${error.response?.data || error.message}`,
                });
                return
            }

        } else{
            switch (page){
                case 0:   
                    if(!forgetForm.email || forgetForm.email.length ===0 || !forgetForm.email.includes('@')){
                        dispatch(setForgetFormProp('emailPlaceholder', phrases[language]?.authMessage5))
                        break
                    }
                    try {
                        await auth.sendPasswordResetEmail(forgetForm.email)
                        Modal.info({
                            // title: 'This is a notification message',
                            content: (
                            <div>
                                <p>{`${phrases[language]?.authMessage6} ${forgetForm.email}`}</p>
                            </div>
                            ),
                            onOk() {
                                dispatch(setSignupFormProp('page', undefined))
                                dispatch(setShowAuth({isLogin: true}))
                            },
                        });
                    } catch (error) {
                        Modal.error({
                            // title: phrases[language]?.authMessage4,
                            content: `${err.response?.data.message || err.message}. ${phrases[language]?.pageReload}`,
                        });
                    }

                case 1: 
                    // if(!signupForm.name || signupForm.name.length ===0){
                    //     dispatch(setSignupFormProp('namePlaceholder', 'There is no empty string allowed'))
                    if(!signupForm.email || signupForm.email.length ===0 || !signupForm.email.includes('@')){
                        dispatch(setSignupFormProp('emailPlaceholder', phrases[language]?.authMessage5))
                        break
                    }
                    try {
                        // console.log('auth', auth)
                        // console.log('user', auth.currentUser)

                        // const usernameData = await db.collection('usernames').where('username', '==', signupForm.name).get()
                        // console.log('usernameData', usernameData.d)
                        const checkUserResponse = await axios({
                            url: "/api/checkuser",
                            method: "POST",
                            // data: {username: signupForm.name},
                            data: {username: signupForm.email},
                            withCredentials: true
                        })
                        // if(usernameData.docs.length === 0){
                        //     dispatch(setSignupFormProp('page', 2))
                        // } else{
                        //     // dispatch(setSignupFormProp('name', ''))
                        //     dispatch(setSignupFormProp('namePlaceholder', `Username ${signupForm.name} is already exists.`))    
                        // }
                    } catch (error) {
                        console.log(error)
                        // dispatch(setSignupFormProp('name', ''))
                        if(error.response?.data==='This username is already in use by another account.'){
                            dispatch(setSignupFormProp('namePlaceholder', phrases[language]?.authMessage7))
                            return
                        }
                        // alert(`ERROR: ${error.response?.data || error.message}`)
                        Modal.error({
                            // title: phrases[language]?.authMessage4,
                            content: `${error.response?.data || error.message}`,
                        });
                        break
                    }
                    if(!signupForm.password || signupForm.password.length < 6 ){
                        dispatch(setSignupFormProp('passwordPlaceholder', phrases[language]?.authMessage8))
                        // dispatch(setSignupFormProp('password', ''))
                        break
                    }
                    if(!signupForm.password || !signupForm.repeat || signupForm.password !== signupForm.repeat){
                        dispatch(setSignupFormProp('repeatPlaceholder', phrases[language]?.authMessage9))
                        // dispatch(setSignupFormProp('repeat', ''))
                        break
                    }
                    dispatch(setSignupFormProp('page', 2))
                    break
                case 2: 
                    if(!signupForm.fullName || signupForm.fullName.length ===0){
                        console.log('fullNamePlaceholder', phrases[language]?.requiredField)
                        dispatch(setSignupFormProp('fullNamePlaceholder', phrases[language]?.requiredField))
                        break
                    }
                    if(!signupForm.companyName || signupForm.companyName.length ===0){
                        dispatch(setSignupFormProp('companyNamePlaceholder', phrases[language]?.requiredField))
                        break
                    }
                    // if(!signupForm.NIP || signupForm.NIP.trim().length !==10 || !Number(signupForm.NIP)){
                    //     // dispatch(setSignupFormProp('NIP', ''))
                    //     dispatch(setSignupFormProp('NIPPlaceholder', 'NIP should be ten digit number'))
                    //     break
                    // }
                    // if(!signupForm.contactEmail || signupForm.contactEmail.length ===0 || !signupForm.contactEmail.includes('@')){
                    //     dispatch(setSignupFormProp('contactEmailPlaceholder', 'Nie wygląda jak prawdziwy email adress...'))
                    //     // dispatch(setSignupFormProp('contactEmail', ''))
                    //     break
                    // }
                    if(!signupForm.phoneNumber || signupForm.phoneNumber.length ===0){
                        // dispatch(setSignupFormProp('phoneNumber', ''))
                        dispatch(setSignupFormProp('phoneNumberPlaceholder', phrases[language]?.requiredField))
                        break
                    }
                    if(signupForm.phoneNumber && !isPossiblePhoneNumber(signupForm.phoneNumber)){
                        dispatch(setSignupFormProp('phoneNumberPlaceholder', phrases[language]?.authMessage10))
                        break
                    }
                    // dispatch(setSignupFormProp('page', 3))
                    // break
                // case 3: 
                //     if(!signupForm.contactName || signupForm.contactName.length === 0){
                //         dispatch(setSignupFormProp('contactNamePlaceholder', 'There is no empty string allowed'))
                //         break
                //     }
                //     if(!signupForm.contactEmail || signupForm.contactEmail.length ===0 || !signupForm.contactEmail.includes('@')){
                //         dispatch(setSignupFormProp('contactEmailPlaceholder', 'Nie wygląda jak prawdziwy email adress...'))
                //         // dispatch(setSignupFormProp('contactEmail', ''))
                //         break
                //     }
                //     if(!signupForm.phoneNumber || signupForm.phoneNumber.length ===0){
                //         // dispatch(setSignupFormProp('phoneNumber', ''))
                //         dispatch(setSignupFormProp('phoneNumberPlaceholder', 'There is no empty string allowed'))
                //         break
                //     }
                //     if(signupForm.phoneNumber && !isPossiblePhoneNumber(signupForm.phoneNumber)){
                //         dispatch(setSignupFormProp('phoneNumberPlaceholder', 'Nie wygląda jak prawdziwy numer telefonu.'))
                //         break
                //     }
                    try {
                        // const user = await auth.createUserWithEmailAndPassword(signupForm.contactEmail, signupForm.password)
                        // console.log('user', user)
                        // const userId = auth.currentUser.uid
                        
                        // await db.collection('users').add({
                        //     userId,
                        //     name: signupForm.name,
                        //     fullName: signupForm.fullName,
                        //     companyName: signupForm.companyName,
                        //     NIP: signupForm.NIP,
                        //     contactName: signupForm.contactName,
                        //     email: signupForm.contactEmail,
                        //     contactEmail: signupForm.contactEmail,
                        //     phoneNumber: signupForm.phoneNumber
                        // })
                        // await db.collection('usernames').add({
                        //     username: signupForm.name,
                        //     email: signupForm.contactEmail,
                        //     userId
                        // })
                        const innerLogo = getData64FromTextImg(signupForm.companyName).replace("data:", "").replace(/^.+,/, "").replaceAll("%0A", "")

                        const createUserResponse = await axios({
                            url: "/api/createuser",
                            method: "POST",
                            data: {
                                // username: signupForm.name, 
                                username: signupForm.email, 
                                password: signupForm.password, 
                                fullName: signupForm.fullName, 
                                companyName: signupForm.companyName, 
                                NIP: signupForm.NIP, 
                                contactFullName: signupForm.contactFullName, 
                                // contactEmail: signupForm.contactEmail, 
                                contactPhone: signupForm.phoneNumber,
                                innerLogo
                            },
                            withCredentials: true
                        })
                        console.log('createuserresponse', createUserResponse)
                        const signInResponse = await auth.signInWithCustomToken(createUserResponse.data.token)
                        console.log('signinresponse', signInResponse)
                        dispatch(setShowAuth({show: false}))
                        const body = document.querySelector("body")
                        body.style.overflow = "auto"  
                        // if(payAfterRegister){
                        //     dispatch(setPayAfterRegister(false))
                        //     //pay actions
                        //     console.log('pay action')
                        //     await packagePay({auth, hiringChoices})
                        //     return
                        // }
                        if(selectedDate.registerAndReserve){
                            // dispatch(registerAndReserve(false))
                            // await reservationPay({auth, selectedDate, startHour, finishHour})
                            await przelewyReservationPay({auth, selectedDate, startHour, finishHour, router})
                            return
                        }
                        if(calendarRedirect)
                            return router.push(`/konto/${language}/rezerwacja`)
                        // router.push('/konto/profil')
                        if(!payAfterRegister){
                            router.push(`/konto/${language}/profil`)
                        }
                    } catch (error) {
                        console.log(error)
                        if(error.response?.data==="The email address is improperly formatted."){
                            dispatch(setSignupFormProp('contactEmailPlaceholder', phrases[language]?.authMessage5))
                            // dispatch(setSignupFormProp('contactEmail', ''))
                            return
                        }
                        if(error.response?.data==="The email address is already in use by another account."){
                            dispatch(setSignupFormProp('emailPlaceholder', phrases[language]?.authMessage11))
                            // dispatch(setSignupFormProp('contactEmail', ''))
                            dispatch(setSignupFormProp('page', 1))
                            return
                        }
                        if(error.response?.data==='This username is already in use by another account.'){
                            dispatch(setSignupFormProp('namePlaceholder', phrases[language]?.authMessage7))
                            // dispatch(setSignupFormProp('contactEmail', ''))
                            dispatch(setSignupFormProp('page', 1))
                            return
                        }
                        // alert(`ERROR: ${error.response?.data || error.message}`)
                        Modal.error({
                            // title: phrases[language]?.authMessage4,
                            content: `${error.response?.data || error.message}`,
                        });
                    }
                    break
            }
        }
    }

    async function submit(e){
        e.preventDefault()
        setBtnDisabled(true)
        await check()
        setBtnDisabled(false)
        dispatch(formSubmitted())
    }

    async function leftClicked(){
        console.log('page', page)
        if(page===undefined){
            dispatch(setShowAuth({isLogin: false}))
            return dispatch(setSignupFormProp('page', 0))            
        }
        if(page===0){
            dispatch(setShowAuth({isLogin: true}))
            return dispatch(setSignupFormProp('page', undefined))            
        }
        dispatch(setSignupFormProp('page', page-1))
    }

    return (
        <div className={styles.authFormBoilerplate}>
            <form onSubmit={submit}>
                {children}
                <div className={styles.authFooter}>
                    <div className={styles.left} onClick={leftClicked}>
                        {isLogin? buttonNames[language]?.forget : page!==1? buttonNames[language]?.back : ''}
                    </div>
                    <button onClick={submit} disabled={btnDisabled}>
                        {isLogin? buttonNames[language]?.login : page!==2? buttonNames[language]?.next: buttonNames[language]?.register2}
                        {btnDisabled && <LoadingOutlined style={{color: "white"}}/>}
                    </button>
                </div>
            </form>   
        </div>
    )
}

export default AuthFormBoilerplate
