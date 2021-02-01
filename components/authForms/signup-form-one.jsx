import React from 'react'

import styles from '../../styles/AuthFormBoilerplate.module.scss'
import AuthFormBoilerplate from './auth-form-boilerplate'
import { useSelector, useDispatch } from 'react-redux'
import { setSignupFormProp } from '../../redux/actions' 

function SignupFormOne() {

    const signupForm = useSelector(state=>state.signupForm)
    const dispatch = useDispatch()

    function onChange(e){
        const prop = e.target.dataset.id
        const value = e.target.value
        dispatch(setSignupFormProp(prop, value))
    }

    return (
        <div className={styles.signupForm}>
            <AuthFormBoilerplate page={1}>
                <input type="text" 
                    placeholder={!signupForm.namePlaceholder ? "Nazwa użytkownika": signupForm.namePlaceholder} 
                    data-id="name" value={signupForm.name} 
                    onChange={onChange}
                />
                <input type="password" placeholder="Hasło" data-id="password" value={signupForm.password} onChange={onChange}/>
                <input 
                    type="password" 
                    placeholder="Powtórz hasło" 
                    placeholder={!signupForm.repeatPlaceholder ? "Powtórz hasło": signupForm.repeatPlaceholder} 
                    data-id="repeat" 
                    value={signupForm.repeat} 
                    onChange={onChange}
                />
            </AuthFormBoilerplate>
        </div>
    )
}

export default SignupFormOne
