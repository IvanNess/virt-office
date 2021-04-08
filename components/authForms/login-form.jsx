import React, {useRef} from 'react'

import styles from '../../styles/AuthFormBoilerplate.module.scss'
import AuthFormBoilerplate from './auth-form-boilerplate'
import { useSelector, useDispatch } from 'react-redux'
import { setLoginFormProp } from '../../redux/actions' 
import { useEffect } from 'react'

function LoginForm({db, auth}) {

    const loginForm = useSelector(state=>state.loginForm)
    const showAuth = useSelector(state=>state.showAuth)
    const formSubmitted = useSelector(state=>state.formSubmitted)

    const dispatch = useDispatch()

    function onChange(e){
        const prop = e.target.dataset.id
        const value = e.target.value
        dispatch(setLoginFormProp(prop, value))
        dispatch(setLoginFormProp(`${prop}Placeholder`, undefined))
    }

    const loginRef = useRef(null)
    const passwordRef = useRef(null)

    useEffect(()=>{
        if(showAuth && showAuth.isLogin){
            loginRef.current.focus()
        }
    }, [showAuth])

    useEffect(()=>{
        if(loginForm.loginPlaceholder){
            loginRef.current.focus()
        }
    }, [loginForm.loginPlaceholder])

    useEffect(()=>{
        if(loginForm.passwordPlaceholder){
            passwordRef.current.focus()
        }
    }, [loginForm.passwordPlaceholder])

    useEffect(()=>{
        if(showAuth.isLogin){
            if(loginForm.loginPlaceholder){
                loginRef.current.focus()
            }else if(loginForm.passwordPlaceholder){
                passwordRef.current.focus()
            }
        }
    }, [formSubmitted, showAuth])

    return (
        <div className={styles.loginForm}>
            <AuthFormBoilerplate isLogin={true}  db={db} auth={auth}>
                <input 
                    label="Login" 
                    variant="outlined" 
                    type="text" 
                    placeholder={!loginForm.loginPlaceholder ? "Login": loginForm.loginPlaceholder} 
                    className={!loginForm.loginPlaceholder ? "login" : styles.error} 
                    data-id="login" 
                    value={loginForm.login} 
                    onChange={onChange}
                    ref={loginRef}
                />
                <input 
                    label="Hasło" 
                    variant="outlined" 
                    type="password" 
                    placeholder={!loginForm.passwordPlaceholder ? "Hasło": loginForm.passwordPlaceholder} 
                    className={!loginForm.passwordPlaceholder ? "haslo" : styles.error} 
                    data-id="password" 
                    value={loginForm.password} 
                    onChange={onChange}
                    ref={passwordRef}
                />
            </AuthFormBoilerplate>
        </div>
    )
}

export default LoginForm
