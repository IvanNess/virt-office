import React, { useState, useEffect } from 'react'
import styles from '../styles/AuthBoilerplate.module.scss'
import CloseIcon from '@material-ui/icons/Close'
import LoginForm from './authForms/login-form'
import SignupFormOne from './authForms/signup-form-one'
import { useSelector, useDispatch } from 'react-redux'
import SignupFormTwo from './authForms/signup-form-two'
import SignupFormThree from './authForms/signup-form-three'
import { setShowAuth, setCurrentUser } from '../redux/actions'

function AuthBoilerplate({db, auth}) {

    const page = useSelector(state=>state.signupForm.page ?? 1)
    const showAuth = useSelector(state=>state.showAuth)

    const dispatch = useDispatch()

    useEffect(()=>{
        auth.onAuthStateChanged((user)=>{
            console.log('on auth state changed', user)
            if(user===null){
                dispatch(setCurrentUser(false))
            } else{
                dispatch(setCurrentUser({
                    email: user.email,
                    username: user.displayName,
                    userId: user.uid,
                    isFullLoaded: false
                }))
            }
            
        })
    }, [auth])

    function onClick(e){
        const id = e.target.dataset?.id
        if(!id)
            return
        if(id=='login'){
            dispatch(setShowAuth({show: true, isLogin: true}))
        }
        if(id=='signup'){
            dispatch(setShowAuth({show: true, isLogin: false}))
        }
    }

    function close(){
        const body = document.querySelector("body")
        body.style.overflow = "auto"
        dispatch(setShowAuth({show: false}))
    }

    return (
        <div className={showAuth.show? styles.authBoilerplate: styles.authBoilerplateNone}>
            <div className={styles[`${showAuth.isLogin? 'login': 'signup'}AuthWrapper`]}>
                <div className={styles.authHeader}>
                    <div className={styles.authLogo}>VIRT OFFICE</div>
                    <CloseIcon style={{fontSize: '78px', color: 'white', cursor: "pointer", marginRight: "-22px"}}
                        onClick={close}
                    />
                </div>
                <div className={styles.authOptions} onClick={onClick}>
                    <div className={showAuth.isLogin? styles.loginSelected: styles.login} data-id='login'>Zaloguj&nbsp;się</div>
                    <div className={styles.space}>&nbsp;</div>                    
                    <div className={!showAuth.isLogin? styles.signinSelected: styles.signin} data-id='signup'>Zarejestruj&nbsp;się</div>
                    <div className={styles.rest}>&nbsp;</div>
                </div>
                <div className={styles.authStep}>
                    {!showAuth.isLogin && <div className={styles.content}>step <span className={styles.stepCount}>{page}</span>/3</div>}
                </div>
                <div className={styles.inner}>
                    {showAuth.isLogin && <LoginForm  db={db} auth={auth}/>}
                    {!showAuth.isLogin && page===1 && <SignupFormOne  db={db} auth={auth}/>}
                    {!showAuth.isLogin && page===2 && <SignupFormTwo  db={db} auth={auth}/>}
                    {!showAuth.isLogin && page===3 && <SignupFormThree  db={db} auth={auth}/>}
                </div>
            </div>
        </div>
    )
}

export default AuthBoilerplate
