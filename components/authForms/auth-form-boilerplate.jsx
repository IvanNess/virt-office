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
                await przelewyPackagePay({auth, hiringChoices, email: currentUser.email, router})
                
            } else if(payAfterRegister && packages && packages.length > 0){
                // dispatch(setPayAfterRegister(false))
                Modal.error({
                    title: 'Błąd zakupu pakietu.',
                    content: 'Masz niedokończony pakiet.',
                    onOk: ()=>dispatch(setPayAfterRegister(false))
                })
                router.push('/konto/pakiet')
            }
        }
        
    }, [payAfterRegister, packages, currentUser])

    async function check(){
        if(isLogin){
            dispatch(setLoginFormProp('loginPlaceholder', ''))
            dispatch(setLoginFormProp('passwordPlaceholder', ''))            
            if(!loginForm.login || loginForm.login.length ===0){
                dispatch(setLoginFormProp('loginPlaceholder', 'No empty string allowed in login.'))
                return
            }
            if(!loginForm.password || loginForm.password.length === 0){
                dispatch(setLoginFormProp('passwordPlaceholder', 'No empty string allowed in password.'))
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
                    await przelewyReservationPay({auth, selectedDate, startHour, finishHour, email: currentUser.email, router})
                    return
                }
                if(calendarRedirect)
                    return router.push('/konto/rezerwacja')
                // router.push('/konto/profil')
                if(!payAfterRegister){
                    router.push('/konto/profil')
                }
            } catch (error) {
                console.log(error)
                if(error?.message==='The password is invalid or the user does not have a password.'){
                    dispatch(setLoginFormProp('passwordPlaceholder', 'there is no user or password wrong'))
                    return
                }
                Modal.error({
                    title: 'This is an error message',
                    content: `${error.response?.data || error.message}`,
                });
                return
            }

        } else{
            switch (page){
                case 0:   
                    if(!forgetForm.email || forgetForm.email.length ===0 || !forgetForm.email.includes('@')){
                        dispatch(setForgetFormProp('emailPlaceholder', 'Nie wygląda jak prawdziwy email adress...'))
                        break
                    }
                    await auth.sendPasswordResetEmail(forgetForm.email)
                    Modal.info({
                        // title: 'This is a notification message',
                        content: (
                          <div>
                            <p>{`Link do zresetowania hasła został wysłany na e-mail ${forgetForm.email}`}</p>
                          </div>
                        ),
                        onOk() {
                            dispatch(setSignupFormProp('page', undefined))
                            dispatch(setShowAuth({isLogin: true}))
                        },
                    });

                case 1: 
                    // if(!signupForm.name || signupForm.name.length ===0){
                    //     dispatch(setSignupFormProp('namePlaceholder', 'There is no empty string allowed'))
                    if(!signupForm.email || signupForm.email.length ===0 || !signupForm.email.includes('@')){
                        dispatch(setSignupFormProp('emailPlaceholder', 'Nie wygląda jak prawdziwy email adress...'))
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
                            dispatch(setSignupFormProp('namePlaceholder', 'This username is already in use by another account.'))
                            return
                        }
                        // alert(`ERROR: ${error.response?.data || error.message}`)
                        Modal.error({
                            title: 'This is an error message',
                            content: `${error.response?.data || error.message}`,
                        });
                        break
                    }
                    if(!signupForm.password || signupForm.password.length < 6 ){
                        dispatch(setSignupFormProp('passwordPlaceholder', 'Password should be at least 6 digits'))
                        // dispatch(setSignupFormProp('password', ''))
                        break
                    }
                    if(!signupForm.password || !signupForm.repeat || signupForm.password !== signupForm.repeat){
                        dispatch(setSignupFormProp('repeatPlaceholder', 'Passwords are not the same...'))
                        // dispatch(setSignupFormProp('repeat', ''))
                        break
                    }
                    dispatch(setSignupFormProp('page', 2))
                    break
                case 2: 
                    if(!signupForm.fullName || signupForm.fullName.length ===0){
                        dispatch(setSignupFormProp('fullNamePlaceholder', 'There is no empty string allowed'))
                        break
                    }
                    if(!signupForm.companyName || signupForm.companyName.length ===0){
                        dispatch(setSignupFormProp('companyNamePlaceholder', 'There is no empty string allowed'))
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
                        dispatch(setSignupFormProp('phoneNumberPlaceholder', 'There is no empty string allowed'))
                        break
                    }
                    if(signupForm.phoneNumber && !isPossiblePhoneNumber(signupForm.phoneNumber)){
                        dispatch(setSignupFormProp('phoneNumberPlaceholder', 'Nie wygląda jak prawdziwy numer telefonu.'))
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
                            await przelewyReservationPay({auth, selectedDate, startHour, finishHour, email: currentUser.email, router})
                            return
                        }
                        if(calendarRedirect)
                            return router.push('/konto/rezerwacja')
                        // router.push('/konto/profil')
                        if(!payAfterRegister){
                            router.push('/konto/profil')
                        }
                    } catch (error) {
                        console.log(error)
                        if(error.response?.data==="The email address is improperly formatted."){
                            dispatch(setSignupFormProp('contactEmailPlaceholder', 'The email address is improperly formatted.'))
                            // dispatch(setSignupFormProp('contactEmail', ''))
                            return
                        }
                        if(error.response?.data==="The email address is already in use by another account."){
                            dispatch(setSignupFormProp('emailPlaceholder', 'The email address is already in use by another account.'))
                            // dispatch(setSignupFormProp('contactEmail', ''))
                            dispatch(setSignupFormProp('page', 1))
                            return
                        }
                        if(error.response?.data==='This username is already in use by another account.'){
                            dispatch(setSignupFormProp('namePlaceholder', 'This username is already in use by another account.'))
                            // dispatch(setSignupFormProp('contactEmail', ''))
                            dispatch(setSignupFormProp('page', 1))
                            return
                        }
                        // alert(`ERROR: ${error.response?.data || error.message}`)
                        Modal.error({
                            title: 'This is an error message',
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
                        {isLogin? "Nie pamiętam hasła": page!==1? "powrót": ''}
                    </div>
                    <button onClick={submit} disabled={btnDisabled}>
                        {isLogin? "Zajoguj się": page!==2?"Dalej":"Sign up"}
                        {btnDisabled && <LoadingOutlined style={{color: "white"}}/>}
                    </button>
                </div>
            </form>   
        </div>
    )
}

export default AuthFormBoilerplate
