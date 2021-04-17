import React, { forwardRef } from 'react'

import styles from '../../styles/AuthFormBoilerplate.module.scss'
import { useSelector, useDispatch } from 'react-redux'
import { setSignupFormProp } from '../../redux/actions'

const AuthPhoneInput = forwardRef( (props, ref) => {

    const {placeholder, onChange, value} = props

    const propName = "phoneNumber"
    const type = "text"

    const signupForm = useSelector(state=>state.signupForm)
    const dispatch = useDispatch()

    // function onChange(e){
    //     const prop = e.target.dataset.id
    //     const value = e.target.value
    //     console.log('input prop value', prop, value)
    //     dispatch(setSignupFormProp(prop, value))
    //     dispatch(setSignupFormProp(`${prop}Placeholder`, undefined))
    // }

    return (
        <div className={styles.inputWrapper}>
            <div className={!signupForm[`${propName}Placeholder`] ? styles.info : styles.infoError}>
                {/* {
                    (!signupForm[`${propName}Placeholder`] && signupForm[propName] !=="" && signupForm[propName]) ? placeholder: 
                        (!signupForm[`${propName}Placeholder`] && (signupForm[propName]==="" || !signupForm[propName])) ? "" : signupForm[`${propName}Placeholder`]
                } */}
                {
                    (!signupForm[`${propName}Placeholder`] && signupForm[propName] !=="" && signupForm[propName]) ? placeholder: 
                        (!signupForm[`${propName}Placeholder`] && (signupForm[propName]==="" || !signupForm[propName])) ? "" : signupForm[`${propName}Placeholder`]
                }
            </div>
            <input type={type}  
                placeholder={placeholder}
                data-id={propName} 
                value={value} 
                onChange={onChange}
                ref={ref}
            />   
        </div>
    )
})

export default AuthPhoneInput
