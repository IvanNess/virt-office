import React, {useRef, useEffect} from 'react'

import styles from '../../styles/AuthFormBoilerplate.module.scss'
import AuthFormBoilerplate from './auth-form-boilerplate'
import { useSelector, useDispatch } from 'react-redux'
import { setSignupFormProp } from '../../redux/actions' 

function SignupFormThree({db, auth}) {

    const signupForm = useSelector(state=>state.signupForm)
    const dispatch = useDispatch()

    const showAuth = useSelector(state=>state.showAuth)
    const formSubmitted = useSelector(state=>state.formSubmitted)
    const contactNameRef = useRef()
    const contactEmailRef = useRef()
    const phoneNumberRef = useRef()

    function onChange(e){
        const prop = e.target.dataset.id
        const value = e.target.value
        dispatch(setSignupFormProp(prop, value))
        dispatch(setSignupFormProp(`${prop}Placeholder`, undefined))
    }

    useEffect(()=>{
        if(showAuth && !showAuth.isLogin && signupForm.page===3){
            contactNameRef.current.focus()
        }
    }, [showAuth, signupForm.page])

    useEffect(()=>{
        if(signupForm.contactNamePlaceholder){
            contactNameRef.current.focus()
        }
    }, [signupForm.contactNamePlaceholder])

    useEffect(()=>{
        if(signupForm.contactEmailPlaceholder){
            contactEmailRef.current.focus()
        }
    }, [signupForm.contactEmailPlaceholder])

    useEffect(()=>{
        if(signupForm.phoneNumberPlaceholder){
            phoneNumberRef.current.focus()
        }
    }, [signupForm.phoneNumberPlaceholder])

    useEffect(()=>{
        if(!showAuth.isLogin){
            if(signupForm.contactNamePlaceholder){
                contactNameRef.current.focus()
            }else if(signupForm.contactEmailPlaceholder){
                contactEmailRef.current.focus()
            }else if(signupForm.phoneNumberPlaceholder){
                phoneNumberRef.current.focus()
            }
        }
    }, [formSubmitted, showAuth])

    return (
        <div className={styles.signupForm}>
            <AuthFormBoilerplate page={3}  db={db} auth={auth}>
                <input type="text" 
                    placeholder={signupForm.contactNamePlaceholder ?? "Imię i Nazwisko osoby kontaktowej"} 
                    className={!signupForm.contactNamePlaceholder ? "contactName" : styles.error} 
                    ref={contactNameRef}
                    data-id="contactName" value={signupForm.contactName} 
                    onChange={onChange}
                />
                <input type="text" 
                    placeholder={signupForm.contactEmailPlaceholder ?? "E-mail do osoby kontaktowej"} 
                    className={!signupForm.contactEmailPlaceholder ? "contactEmail" : styles.error} 
                    ref={contactEmailRef}
                    data-id="contactEmail" value={signupForm.contactEmail} 
                    onChange={onChange}
                />                
                <input type="text" 
                    placeholder={signupForm.phoneNumberPlaceholder ?? "Telefon do osoby kontaktowej"} 
                    className={!signupForm.phoneNumberPlaceholder ? "phoneNumber" : styles.error} 
                    ref={phoneNumberRef}                    
                    data-id="phoneNumber" value={signupForm.phoneNumber} 
                    onChange={onChange}
                /> 
            </AuthFormBoilerplate>
        </div>
    )
}

export default SignupFormThree
