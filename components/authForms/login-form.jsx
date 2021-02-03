import React from 'react'

import styles from '../../styles/AuthFormBoilerplate.module.scss'
import AuthFormBoilerplate from './auth-form-boilerplate'
import { useSelector, useDispatch } from 'react-redux'
import { setLoginFormProp } from '../../redux/actions' 
import { TextField } from '@material-ui/core'

function LoginForm({db, auth}) {

    const loginForm = useSelector(state=>state.loginForm)
    const dispatch = useDispatch()

    function onChange(e){
        const prop = e.target.dataset.id
        const value = e.target.value
        dispatch(setLoginFormProp(prop, value))
    }

    return (
        <div className={styles.loginForm}>
            <AuthFormBoilerplate isLogin={true}  db={db} auth={auth}>
                <input 
                    label="Login" 
                    variant="outlined" 
                    type="text" 
                    placeholder={!loginForm.loginPlaceholder ? "Login": loginForm.loginPlaceholder} 
                    data-id="login" 
                    value={loginForm.login} 
                    onChange={onChange}
                />
                <input 
                    label="Hasło" 
                    variant="outlined" 
                    type="password" 
                    placeholder={!loginForm.passwordPlaceholder ? "Hasło": loginForm.passwordPlaceholder} 
                    data-id="password" 
                    value={loginForm.password} 
                    onChange={onChange}
                />
            </AuthFormBoilerplate>
        </div>
    )
}

export default LoginForm
