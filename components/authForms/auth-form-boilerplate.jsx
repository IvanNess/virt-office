import React from 'react'

import styles from '../../styles/AuthFormBoilerplate.module.scss'
import { useSelector, useDispatch } from 'react-redux'
import { setSignupFormProp } from '../../redux/actions'

function AuthFormBoilerplate({children, isLogin=false, page}) {

    const signupForm = useSelector(state=>state.signupForm)
    const dispatch = useDispatch()

    function submit(e){
        e.preventDefault()
        if(isLogin){
            console.log('send login data to firebase')
        } else{
            switch (page){
                case 1: 
                    if(!signupForm.name || signupForm.name.length ===0){
                        dispatch(setSignupFormProp('namePlaceholder', 'There is no empty string allowed'))
                        break
                    }
                    if(!signupForm.password || !signupForm.repeat || signupForm.password !== signupForm.repeat){
                        dispatch(setSignupFormProp('repeatPlaceholder', 'Passwords are not the same...'))
                        dispatch(setSignupFormProp('repeat', ''))
                        break
                    }
                    dispatch(setSignupFormProp('page', 2))
                    break
                case 2: 
                    if(!signupForm.fullName || signupForm.fullName.length ===0){
                        dispatch(setSignupFormProp('fullNamePlaceholder', 'There is no empty string allowed'))
                        break
                    }
                    if(!signupForm.companyName || signupForm.companyName.length ===0){
                        dispatch(setSignupFormProp('companyNamePlaceholder', 'There is no empty string allowed'))
                        break
                    }
                    if(!signupForm.NIP || signupForm.NIP.length !==10 || !Number(signupForm.NIP)){
                        dispatch(setSignupFormProp('NIP', ''))
                        dispatch(setSignupFormProp('NIPPlaceholder', 'NIP should be ten digit number'))
                        break
                    }
                    dispatch(setSignupFormProp('page', 3))
                    break
                case 3: 
                    if(!signupForm.contactName || signupForm.contactName.length === 0){
                        dispatch(setSignupFormProp('contactNamePlaceholder', 'There is no empty string allowed'))
                        break
                    }
                    if(!signupForm.contactEmail || signupForm.contactEmail.length ===0 || !signupForm.contactEmail.includes('@')){
                        dispatch(setSignupFormProp('contactEmailPlaceholder', 'Its not looks like an email adress...'))
                        dispatch(setSignupFormProp('contactEmail', ''))
                        break
                    }
                    if(!signupForm.phoneNumber || signupForm.phoneNumber.length ===0){
                        dispatch(setSignupFormProp('phoneNumber', ''))
                        dispatch(setSignupFormProp('phoneNumberPlaceholder', 'There is no empty string allowed'))
                        break
                    }
                    console.log('The data is sending to firebase...')
                    break
            }
        }
    }

    function leftClicked(){
        dispatch(setSignupFormProp('page', page-1))
    }

    return (
        <div className={styles.authFormBoilerplate}>
            <form onSubmit={submit}>
                {children}
                <div className={styles.authFooter}>
                    <div className={styles.left} onClick={leftClicked}>
                        {isLogin? "Nie pamiętam hasła": page!==1?"prev":''}
                    </div>
                    <input type="submit" onSubmit={submit} value={isLogin? "Zajoguj się": page!==3?"Next":"Sign up"} onChange={()=>{}}/>
                </div>
            </form>   
        </div>
    )
}

export default AuthFormBoilerplate
