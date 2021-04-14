import React, {useState} from 'react'

import styles from '../../styles/AuthFormBoilerplate.module.scss'
import { useSelector, useDispatch } from 'react-redux'
import { setSignupFormProp, setLoginFormProp, setShowAuth, formSubmitted, setPayAfterRegister } from '../../redux/actions'
import { useRouter } from 'next/router'
import axios from 'axios'
import { packagePay } from '../../utilities'

function AuthFormBoilerplate({children, isLogin=false, page, db, auth}) {

    const signupForm = useSelector(state=>state.signupForm)
    const loginForm = useSelector(state=>state.loginForm)
    const calendarRedirect = useSelector(state=>state.calendarRedirect)
    const payAfterRegister = useSelector(state=>state.payAfterRegister)
    const hiringChoices = useSelector(state=>state.hiringChoices)

    const [btnDisabled, setBtnDisabled] = useState(false)

    const dispatch = useDispatch()

    const router = useRouter()

    async function check(){
        if(isLogin){
            console.log('send login data to firebase')
            if(!loginForm.login || loginForm.login.length ===0){
                dispatch(setLoginFormProp('loginPlaceholder', 'No empty string allowed in login.'))
                return
            }
            if(!loginForm.password || loginForm.password.length === 0){
                dispatch(setLoginFormProp('passwordPlaceholder', 'No empty string allowed in password.'))
                dispatch(setLoginFormProp('password', ''))
                return
            }
            try {
                // const usernameDocs = await db.collection("usernames").where("username", "==", loginForm.login).get()
                const emailresponse = await axios({
                    url: "/api/getuseremail",
                    method: "POST",
                    data: { username: loginForm.login }
                })
                const email = emailresponse.data.email
                // console.log('usernameDocs', usernameDocs)
                // if(usernameDocs.docs.length===0){
                //     dispatch(setLoginFormProp('password', ''))
                //     dispatch(setLoginFormProp('passwordPlaceholder', `There is no user or password wrong.`))
                //     return
                // }
                // const username = usernameDocs.docs[0].data()
                // console.log('username', username)
                try {
                    await auth.signInWithEmailAndPassword(email, loginForm.password)
                    dispatch(setShowAuth({show: false}))
                    const body = document.querySelector("body")
                    body.style.overflow = "auto"
                    // router.push('/konto/profil')
                    if(payAfterRegister){
                        dispatch(setPayAfterRegister(false))
                        //pay actions
                        console.log('pay action')
                        await packagePay({auth, hiringChoices})
                    }
                    if(calendarRedirect)
                        router.push('/konto/rezerwacja')

                } catch (error) {
                    console.log(error)
                    dispatch(setLoginFormProp('password', ''))
                    dispatch(setLoginFormProp('passwordPlaceholder', `There is no user or password wrong.`))
                    return
                }
            } catch (error) {
                console.log(error)
            }
        } else{
            switch (page){
                case 1: 
                    if(!signupForm.name || signupForm.name.length ===0){
                        dispatch(setSignupFormProp('namePlaceholder', 'There is no empty string allowed'))
                        break
                    }
                    if(!signupForm.password || signupForm.password.length < 6 ){
                        dispatch(setSignupFormProp('passwordPlaceholder', 'Password should be at least 6 digits'))
                        dispatch(setSignupFormProp('password', ''))
                        break
                    }
                    if(!signupForm.password || !signupForm.repeat || signupForm.password !== signupForm.repeat){
                        dispatch(setSignupFormProp('repeatPlaceholder', 'Passwords are not the same...'))
                        dispatch(setSignupFormProp('repeat', ''))
                        break
                    }
                    try {
                        console.log('auth', auth)
                        console.log('user', auth.currentUser)

                        const usernameData = await db.collection('usernames').where('username', '==', signupForm.name).get()
                        console.log('usernameData', usernameData.d)
                        if(usernameData.docs.length === 0){
                            dispatch(setSignupFormProp('page', 2))
                        } else{
                            dispatch(setSignupFormProp('name', ''))
                            dispatch(setSignupFormProp('namePlaceholder', `Username ${signupForm.name} is already exists.`))    
                        }
                    } catch (error) {
                        console.log(error)
                        dispatch(setSignupFormProp('name', ''))
                        dispatch(setSignupFormProp('namePlaceholder', `${error}`))
                        break
                    }
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
                    if(!signupForm.NIP || signupForm.NIP.trim().length !==10 || !Number(signupForm.NIP)){
                        dispatch(setSignupFormProp('NIP', ''))
                        dispatch(setSignupFormProp('NIPPlaceholder', 'NIP should be ten digit number'))
                        break
                    }
                    dispatch(setSignupFormProp('page', 3))
                    break
                case 3: 
                    if(!signupForm.contactName || signupForm.contactName.length === 0){
                        dispatch(setSignupFormProp('contactNamePlaceholder', 'There is no empty string allowed'))
                        break
                    }
                    if(!signupForm.contactEmail || signupForm.contactEmail.length ===0 || !signupForm.contactEmail.includes('@')){
                        dispatch(setSignupFormProp('contactEmailPlaceholder', 'Its not looks like an email adress...'))
                        dispatch(setSignupFormProp('contactEmail', ''))
                        break
                    }
                    if(!signupForm.phoneNumber || signupForm.phoneNumber.length ===0){
                        dispatch(setSignupFormProp('phoneNumber', ''))
                        dispatch(setSignupFormProp('phoneNumberPlaceholder', 'There is no empty string allowed'))
                        break
                    }
                    console.log('The data is sending to firebase...')
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
                        const createUserResponse = await axios({
                            url: "/api/createuser",
                            method: "POST",
                            data: {
                                username: signupForm.name, 
                                password: signupForm.password, 
                                fullName: signupForm.fullName, 
                                companyName: signupForm.companyName, 
                                NIP: signupForm.NIP, 
                                contactFullName: signupForm.contactFullName, 
                                contactEmail: signupForm.contactEmail, 
                                contactPhone: signupForm.phoneNumber
                            },
                            withCredentials: true
                        })
                        console.log('createuserresponse', createUserResponse)
                        const signInResponse = await auth.signInWithCustomToken(createUserResponse.data.token)
                        console.log('signinresponse', signInResponse)
                        dispatch(setShowAuth({show: false}))
                        const body = document.querySelector("body")
                        body.style.overflow = "auto"  
                        if(payAfterRegister){
                            dispatch(setPayAfterRegister(false))
                            //pay actions
                            console.log('pay action')
                            await packagePay({auth, hiringChoices})
                        }
                        if(calendarRedirect)
                            router.push('/konto/rezerwacja')
                    } catch (error) {
                        console.log(error)
                        alert(`ERROR: ${error.message}`)
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
            // await fetch('http://localhost:5001/virt-office/us-central1/addMessage?text=upp')
            const res = await fetch('/api/hello')
            const data = await res.json()
            console.log(data)
        }
        dispatch(setSignupFormProp('page', page-1))
    }

    return (
        <div className={styles.authFormBoilerplate}>
            <form onSubmit={submit}>
                {children}
                <div className={styles.authFooter}>
                    <div className={styles.left} onClick={leftClicked}>
                        {isLogin? "Nie pamiętam hasła": page!==1?"prev":''}
                    </div>
                    <button onClick={submit} disabled={btnDisabled}>
                        {isLogin? "Zajoguj się": page!==3?"Dalej":"Sign up"}
                    </button>
                </div>
            </form>   
        </div>
    )
}

export default AuthFormBoilerplate
