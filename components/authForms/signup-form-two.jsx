import React from 'react'

import styles from '../../styles/AuthFormBoilerplate.module.scss'
import AuthFormBoilerplate from './auth-form-boilerplate'
import { useSelector, useDispatch } from 'react-redux'
import { setSignupFormProp } from '../../redux/actions' 

function SignupFormTwo() {

    const signupForm = useSelector(state=>state.signupForm)
    const dispatch = useDispatch()

    function onChange(e){
        const prop = e.target.dataset.id
        const value = e.target.value
        dispatch(setSignupFormProp(prop, value))

    }

    return (
        <div className={styles.signupForm}>
            <AuthFormBoilerplate page={2}>
                <input type="text" 
                    placeholder={!signupForm.fullNamePlaceholder ? "Imię i Nazwisko": signupForm.fullNamePlaceholder} 
                    data-id="fullName" value={signupForm.fullName} 
                    onChange={onChange}
                />
                <input type="text" 
                    placeholder={!signupForm.companyNamePlaceholder ? "Nazwa firmy": signupForm.companyNamePlaceholder} 
                    data-id="companyName" value={signupForm.companyName} 
                    onChange={onChange}
                />                
                <input type="text" 
                    placeholder={!signupForm.NIPPlaceholder ? "NIP": signupForm.NIPPlaceholder} 
                    data-id="NIP" value={signupForm.NIP} 
                    onChange={onChange}
                /> 
            </AuthFormBoilerplate>
        </div>
    )
}

export default SignupFormTwo
