import React from 'react'

import styles from '../../styles/AuthFormBoilerplate.module.scss'
import AuthFormBoilerplate from './auth-form-boilerplate'
import { useSelector, useDispatch } from 'react-redux'
import { setSignupFormProp } from '../../redux/actions' 

function SignupFormThree() {

    const signupForm = useSelector(state=>state.signupForm)
    const dispatch = useDispatch()

    function onChange(e){
        const prop = e.target.dataset.id
        const value = e.target.value
        dispatch(setSignupFormProp(prop, value))
    }

    return (
        <div className={styles.signupForm}>
            <AuthFormBoilerplate page={3}>
                <input type="text" 
                    placeholder={signupForm.contactNamePlaceholder ?? "Imię i Nazwisko osoby kontaktowej"} 
                    data-id="contactName" value={signupForm.contactName} 
                    onChange={onChange}
                />
                <input type="text" 
                    placeholder={signupForm.contactEmailPlaceholder ?? "E-mail do osoby kontaktowej"} 
                    data-id="contactEmail" value={signupForm.contactEmail} 
                    onChange={onChange}
                />                
                <input type="text" 
                    placeholder={signupForm.phoneNumberPlaceholder ?? "Telefon do osoby kontaktowej"} 
                    data-id="phoneNumber" value={signupForm.phoneNumber} 
                    onChange={onChange}
                /> 
            </AuthFormBoilerplate>
        </div>
    )
}

export default SignupFormThree
