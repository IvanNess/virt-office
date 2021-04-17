import React, { useRef, useEffect } from 'react'

import styles from '../../styles/AuthFormBoilerplate.module.scss'
import AuthFormBoilerplate from './auth-form-boilerplate'
import { useSelector, useDispatch } from 'react-redux'
import { setSignupFormProp } from '../../redux/actions' 
import AuthInput from './auth-input'

function SignupFormTwo({db, auth}) {

    const signupForm = useSelector(state=>state.signupForm)
    const dispatch = useDispatch()

    const showAuth = useSelector(state=>state.showAuth)
    const formSubmitted = useSelector(state=>state.formSubmitted)
    const fullNameRef = useRef()
    const companyNameRef = useRef()
    const NIPRef = useRef()

    function onChange(e){
        const prop = e.target.dataset.id
        const value = e.target.value
        dispatch(setSignupFormProp(prop, value))
        dispatch(setSignupFormProp(`${prop}Placeholder`, undefined))
    }

    useEffect(()=>{
        if(showAuth && !showAuth.isLogin && signupForm.page===2){
            fullNameRef.current.focus()
        }
    }, [showAuth, signupForm.page])

    useEffect(()=>{
        if(signupForm.fullNamePlaceholder){
            fullNameRef.current.focus()
        }
    }, [signupForm.fullNamePlaceholder])

    useEffect(()=>{
        if(signupForm.companyNamePlaceholder){
            companyNameRef.current.focus()
        }
    }, [signupForm.companyNamePlaceholder])

    useEffect(()=>{
        if(signupForm.NIPPlaceholder){
            NIPRef.current.focus()
        }
    }, [signupForm.NIPPlaceholder])

    useEffect(()=>{
        if(!showAuth.isLogin){
            if(signupForm.fullNamePlaceholder){
                fullNameRef.current.focus()
            }else if(signupForm.companyNamePlaceholder){
                companyNameRef.current.focus()
            }else if(signupForm.NIPPlaceholder){
                NIPRef.current.focus()
            }
        }
    }, [formSubmitted, showAuth])

    return (
        <div className={styles.signupForm}>
            <AuthFormBoilerplate page={2}  db={db} auth={auth}>

                <AuthInput
                    type="text"  
                    propName="fullName"
                    placeholder="Imię i Nazwisko"
                    ref={fullNameRef}
                />

                <AuthInput
                    type="text"  
                    propName="companyName"
                    placeholder="Nazwa firmy"
                    ref={companyNameRef}
                />

                <AuthInput
                    type="text"  
                    propName="NIP"
                    placeholder="NIP"
                    ref={NIPRef}
                />

            </AuthFormBoilerplate>
        </div>
    )
}

export default SignupFormTwo
