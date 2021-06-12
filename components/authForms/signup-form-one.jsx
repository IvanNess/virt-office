import React, { useRef, useEffect } from 'react'

import styles from '../../styles/AuthFormBoilerplate.module.scss'
import AuthFormBoilerplate from './auth-form-boilerplate'
import { useSelector, useDispatch } from 'react-redux'
import { setSignupFormProp } from '../../redux/actions' 
import AuthInput from './auth-input'
import { phrases } from '../../accessories/constants'

function SignupFormOne({db, auth}) {

    const signupForm = useSelector(state=>state.signupForm)
    const showAuth = useSelector(state=>state.showAuth)
    const formSubmitted = useSelector(state=>state.formSubmitted)
    const language = useSelector(state=>state.language)
    const dispatch = useDispatch()

    const nameRef = useRef()
    const passwordRef = useRef()
    const repeatRef = useRef()

    function onChange(e){
        const prop = e.target.dataset.id
        const value = e.target.value
        console.log('input prop value', prop, value)
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

                <AuthInput
                    type="text"  
                    propName="email"
                    placeholder={phrases[language]?.email}
                    ref={nameRef}
                />

                <AuthInput
                    type="password"  
                    propName="password"
                    placeholder={phrases[language]?.password}
                    ref={passwordRef}
                />

                <AuthInput
                    type="password"  
                    propName="repeat"
                    placeholder={phrases[language]?.repeatPassword}
                    ref={repeatRef}
                />

            </AuthFormBoilerplate>
        </div>
    )
}

export default SignupFormOne
