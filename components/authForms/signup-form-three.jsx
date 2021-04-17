import React, {useRef, useEffect} from 'react'

import styles from '../../styles/AuthFormBoilerplate.module.scss'

import 'react-phone-number-input/style.css'

import AuthFormBoilerplate from './auth-form-boilerplate'
import { useSelector, useDispatch } from 'react-redux'
import { setSignupFormProp } from '../../redux/actions' 
import pl from 'react-phone-number-input/locale/pl'

import flags from '../../accessories/flags'
import PhoneInput from 'react-phone-number-input'
import AuthInput from './auth-input'
import AuthPhoneInput from './auth-phone-input'

function SignupFormThree({db, auth}) {

    const signupForm = useSelector(state=>state.signupForm)
    const dispatch = useDispatch()

    const showAuth = useSelector(state=>state.showAuth)
    const formSubmitted = useSelector(state=>state.formSubmitted)
    const contactNameRef = useRef()
    const contactEmailRef = useRef()
    const phoneNumberRef = useRef()
    const phoneRef = useRef(null)

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
            phoneRef.current.focus()
            // dispatch(setSignupFormProp("phoneNumber", ''))
        }
    }, [signupForm.phoneNumberPlaceholder])

    useEffect(()=>{
        if(!showAuth.isLogin){
            if(signupForm.contactNamePlaceholder){
                contactNameRef.current.focus()
            }else if(signupForm.contactEmailPlaceholder){
                contactEmailRef.current.focus()
            }else if(signupForm.phoneNumberPlaceholder){
                phoneRef.current.focus()
            }
        }
    }, [formSubmitted, showAuth])

    function changePhoneNumber(value){
        dispatch(setSignupFormProp("phoneNumber", phoneRef.current.value))
        dispatch(setSignupFormProp(`phoneNumberPlaceholder`, undefined))
    }

    return (
        <div className={styles.signupForm}>
            <AuthFormBoilerplate page={3}  db={db} auth={auth}>

                <AuthInput
                    type="text"  
                    propName="contactName"
                    placeholder="Imię i Nazwisko osoby kontaktowej"
                    ref={contactNameRef}
                />

                {/* <input type="text" 
                    placeholder={signupForm.contactNamePlaceholder ?? "Imię i Nazwisko osoby kontaktowej"} 
                    className={!signupForm.contactNamePlaceholder ? "contactName" : styles.error} 
                    ref={contactNameRef}
                    data-id="contactName" value={signupForm.contactName} 
                    onChange={onChange}
                /> */}

                <AuthInput
                    type="text"  
                    propName="contactEmail"
                    placeholder="E-mail do osoby kontaktowej"
                    ref={contactEmailRef}
                />


                {/* <input type="text" 
                    placeholder={signupForm.contactEmailPlaceholder ?? "E-mail do osoby kontaktowej"} 
                    className={!signupForm.contactEmailPlaceholder ? "contactEmail" : styles.error} 
                    ref={contactEmailRef}
                    data-id="contactEmail" value={signupForm.contactEmail} 
                    onChange={onChange}
                />                 */}

                {/* <input type="text" 
                    placeholder={signupForm.phoneNumberPlaceholder ?? "Telefon do osoby kontaktowej"} 
                    className={!signupForm.phoneNumberPlaceholder ? "phoneNumber" : styles.error} 
                    ref={phoneNumberRef}                    
                    data-id="phoneNumber" value={signupForm.phoneNumber} 
                    onChange={onChange}
                />  */}
                <PhoneInput 
                    placeholder={signupForm.phoneNumberPlaceholder ?? "Telefon"} 
                    // defaultCountry="PL"
                    labels={pl}
                    international={true}
                    countryCallingCodeEditable={true}
                    value={signupForm?.phoneNumber || null} 
                    onChange={changePhoneNumber}
                    flags={flags}
                    countryOptionsOrder={["PL", "RU", "UA", "BY", "|", "..."]}
                    ref={phoneRef}
                    inputComponent={AuthPhoneInput}
                />
            </AuthFormBoilerplate>
        </div>
    )
}

export default SignupFormThree
