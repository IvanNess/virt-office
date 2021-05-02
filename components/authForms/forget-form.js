import React, { useRef, useEffect } from 'react'

import styles from '../../styles/AuthFormBoilerplate.module.scss'
import AuthFormBoilerplate from './auth-form-boilerplate'
import { useSelector, useDispatch } from 'react-redux'
import { setSignupFormProp } from '../../redux/actions' 
import AuthInput from './auth-input'
import ForgetInput from './forget-input'

function ForgetForm({db, auth}) {

    const forgetForm = useSelector(state=>state.forgetForm)
    const showAuth = useSelector(state=>state.showAuth)
    const formSubmitted = useSelector(state=>state.formSubmitted)
    const dispatch = useDispatch()

    const emailRef = useRef()

    useEffect(()=>{
        emailRef.current.focus()
    }, [])

    useEffect(()=>{
        if(forgetForm.emailPlaceholder){
            emailRef.current.focus()
        }
    }, [forgetForm.emailPlaceholder])

    return (
        <div className={styles.forgetForm}>
            <AuthFormBoilerplate page={0}  db={db} auth={auth}>

                <ForgetInput
                    type="text"  
                    propName="email"
                    placeholder="E-mail podany podczas rejestracji"
                    ref={emailRef}
                />

            </AuthFormBoilerplate>
        </div>
    )
}

export default ForgetForm
