import React, { useRef, useEffect } from 'react'

import styles from '../../styles/AuthFormBoilerplate.module.scss'
import AuthFormBoilerplate from './auth-form-boilerplate'
import { useSelector, useDispatch } from 'react-redux'
import { setSignupFormProp } from '../../redux/actions' 

function SignupFormOne({db, auth}) {

    const signupForm = useSelector(state=>state.signupForm)
    const showAuth = useSelector(state=>state.showAuth)
    const formSubmitted = useSelector(state=>state.formSubmitted)
    const dispatch = useDispatch()

    const nameRef = useRef()
    const passwordRef = useRef()
    const repeatRef = useRef()

    function onChange(e){
        const prop = e.target.dataset.id
        const value = e.target.value
        dispatch(setSignupFormProp(prop, value))
        dispatch(setSignupFormProp(`${prop}Placeholder`, undefined))
    }

    useEffect(()=>{
        if(showAuth && !showAuth.isLogin){
            nameRef.current.focus()
        }
    }, [showAuth])

    useEffect(()=>{
        if(signupForm.namePlaceholder){
            nameRef.current.focus()
        }
    }, [signupForm.namePlaceholder])

    useEffect(()=>{
        if(signupForm.passwordPlaceholder){
            passwordRef.current.focus()
        }
    }, [signupForm.passwordPlaceholder])

    useEffect(()=>{
        if(signupForm.repeatPlaceholder){
            repeatRef.current.focus()
        }
    }, [signupForm.repeatPlaceholder])

    useEffect(()=>{
        if(!showAuth.isLogin){
            if(signupForm.namePlaceholder){
                nameRef.current.focus()
            }else if(signupForm.passwordPlaceholder){
                passwordRef.current.focus()
            }else if(signupForm.repeatPlaceholder){
                repeatRef.current.focus()
            }
        }
    }, [formSubmitted, showAuth])

    return (
        <div className={styles.signupForm}>
            <AuthFormBoilerplate page={1}  db={db} auth={auth}>
                <input type="text" 
                    placeholder={!signupForm.namePlaceholder ? "Nazwa użytkownika": signupForm.namePlaceholder} 
                    className={!signupForm.namePlaceholder ? "login" : styles.error} 
                    data-id="name" value={signupForm.name} 
                    onChange={onChange}
                    ref={nameRef}
                />
                <input 
                    type="password" 
                    placeholder={!signupForm.passwordPlaceholder ? "Hasło": signupForm.passwordPlaceholder} 
                    className={!signupForm.passwordPlaceholder ? "password" : styles.error} 
                    data-id="password" 
                    value={signupForm.password} 
                    onChange={onChange}
                    ref={passwordRef}
                />
                <input 
                    type="password" 
                    placeholder="Powtórz hasło" 
                    placeholder={!signupForm.repeatPlaceholder ? "Powtórz hasło": signupForm.repeatPlaceholder} 
                    className={!signupForm.repeatPlaceholder ? "repeat" : styles.error} 
                    data-id="repeat" 
                    value={signupForm.repeat} 
                    onChange={onChange}
                    ref={repeatRef}
                />
            </AuthFormBoilerplate>
        </div>
    )
}

export default SignupFormOne
