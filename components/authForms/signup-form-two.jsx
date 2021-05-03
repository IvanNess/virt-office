import React, { useRef, useEffect } from 'react'

import styles from '../../styles/AuthFormBoilerplate.module.scss'
import AuthFormBoilerplate from './auth-form-boilerplate'
import { useSelector, useDispatch } from 'react-redux'
import { setSignupFormProp } from '../../redux/actions' 
import AuthInput from './auth-input'
import PhoneInput from 'react-phone-number-input'
import pl from 'react-phone-number-input/locale/pl'
import flags from '../../accessories/flags'
import AuthPhoneInput from './auth-phone-input'


function SignupFormTwo({db, auth}) {

    const signupForm = useSelector(state=>state.signupForm)
    const dispatch = useDispatch()

    const showAuth = useSelector(state=>state.showAuth)
    const formSubmitted = useSelector(state=>state.formSubmitted)
    const fullNameRef = useRef()
    const companyNameRef = useRef()
    const NIPRef = useRef()
    const contactEmailRef = useRef()
    const phoneRef = useRef()

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

    // useEffect(()=>{
    //     if(signupForm.NIPPlaceholder){
    //         NIPRef.current.focus()
    //     }
    // }, [signupForm.NIPPlaceholder])

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
            if(signupForm.fullNamePlaceholder){
                fullNameRef.current.focus()
            }else if(signupForm.companyNamePlaceholder){
                companyNameRef.current.focus()
            // }else if(signupForm.NIPPlaceholder){
            //     NIPRef.current.focus()
            // }
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

                {/* <AuthInput
                    type="text"  
                    propName="NIP"
                    placeholder="NIP"
                    ref={NIPRef}
                /> */}

                <AuthInput
                    type="text"  
                    propName="contactEmail"
                    placeholder="E-mail do osoby kontaktowej"
                    ref={contactEmailRef}
                />

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

export default SignupFormTwo
