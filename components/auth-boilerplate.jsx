import React, { useState, useEffect } from 'react'
import styles from '../styles/AuthBoilerplate.module.scss'
import CloseIcon from '@material-ui/icons/Close'
import LoginForm from './authForms/login-form'
import SignupFormOne from './authForms/signup-form-one'
import { useSelector, useDispatch } from 'react-redux'
import SignupFormTwo from './authForms/signup-form-two'
import SignupFormThree from './authForms/signup-form-three'
import { setShowAuth, setCurrentUser, setCalendarRedirect } from '../redux/actions'
import Link from 'next/link'
import { useClickOutside } from 'react-click-outside-hook'

function AuthBoilerplate({db, auth}) {

    const page = useSelector(state=>state.signupForm.page ?? 1)
    const calendarRedirect = useSelector(state=>state.calendarRedirect)
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
        if(calendarRedirect){
            dispatch(setCalendarRedirect(false))
        } 
    }

    return (
        <div className={showAuth.show? styles.authBoilerplate: styles.authBoilerplateNone}>
            <div className={styles[`${showAuth.isLogin? 'login': 'signup'}AuthWrapper`]}>
                <div className={styles.authHeader}>
                    <div className={styles.logo}>
                        <Link href="/"><a>
                            <svg xmlns="http://www.w3.org/2000/svg" width="90.542" height="56.415" viewBox="0 0 90.542 56.415">
                                <path id="Path_57" data-name="Path 57" d="M4348.856,1032.966a28.1,28.1,0,0,0-3.708-6.322c-.563-.726-1.187-1.451-1.859-2.158q-.236-.247-.476-.487a28.157,28.157,0,0,0-8.979-6.048l-.138-.056a27.945,27.945,0,0,0-8.833-2.087c-.657-.045-1.33-.069-2-.069-.049,0-.095,0-.143,0a28.04,28.04,0,0,0-6.93.893c-.794.2-1.591.447-2.37.727l-.179.064c-.4.142-.8.3-1.2.467l-.16.065a28.173,28.173,0,0,0-7.941,5.068l-.023.022c-.367.336-.694.648-1,.952-.162.162-.324.326-.479.489a28.335,28.335,0,0,0-4.469,6.178l-4.42,8.842-11.878-23.769h-12.823l18.29,36.6-1.908,3.817-14.659-29.332-5.539-11.086h-4.508l22.344,44.713h0l2.362,4.726,4.162-8.328,4.157,8.321,13.742-27.5.053-.1c.156-.353.339-.719.542-1.088l.022-.044a15.764,15.764,0,0,1,2.646-3.509,15.514,15.514,0,0,1,9.093-4.458l.7-.069a15.633,15.633,0,1,1,.161,31.177l-15.836,0,2.705-5.414-.348-.526a16.744,16.744,0,0,1-1.04-1.807l-.975-1.963-3.92,7.842-1.481,2.96,1.582,3.162h20.654a19.913,19.913,0,0,0,9.091-2.19,19.438,19.438,0,0,0,5.325-4.078,19.985,19.985,0,0,0,5.412-13.852,19.717,19.717,0,0,0-5.807-13.787,19.943,19.943,0,0,0-4.867-3.577,19.558,19.558,0,0,0-7.939-2.194l-2.364,0a1.681,1.681,0,0,0-.192.011,19.646,19.646,0,0,0-7.81,2.184,19.681,19.681,0,0,0-3.041,1.955,18.494,18.494,0,0,0-1.87,1.584,19.99,19.99,0,0,0-3.169,4.119l-11.067,22.144-1.9-3.806,8.84-17.693.06-.121a23.224,23.224,0,0,1,1.3-2.611,23.913,23.913,0,0,1,2.8-3.881c.316-.359.655-.72,1.007-1.072.311-.31.633-.616.958-.907a23.96,23.96,0,0,1,6.141-4c.175-.08.351-.156.523-.23.644-.272,1.289-.513,1.926-.717a23.644,23.644,0,0,1,5.838-1.114c.235-.017.472-.029.727-.036s.522-.016.845-.016c.387,0,.762.009,1.141.028.139,0,.277.012.438.025a23.861,23.861,0,0,1,14.42,6.062c.325.291.647.6.958.907.355.355.693.716,1.011,1.076a23.954,23.954,0,0,1-.116,31.9c-.295.327-.6.644-.894.943-.358.358-.731.708-1.113,1.042a23.837,23.837,0,0,1-15.539,5.978h-.034c-.091,0-.182,0-.271,0s-.178,0-.269,0h-19.122l2.125,4.255h19.231l.033,0a28.028,28.028,0,0,0,8.2-1.751l0,.012.737-.3.107-.045,1.167-.481-.013-.031a28.4,28.4,0,0,0,7.979-5.662c.134-.133.265-.266.387-.395a28.572,28.572,0,0,0,1.878-2.155,28.25,28.25,0,0,0,3.779-28.375Zm-59.455,14.861L4275.492,1020h3.8l12.006,24.026Z" transform="translate(-4260.532 -1015.74)" fill="#121109"/>
                            </svg>
                            {/* <div className={styles.logoText}>VIRTOFFICE</div> */}
                        </a></Link>
                    </div>
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
