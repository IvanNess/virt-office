import React from 'react'
import styles from '../styles/Header.module.scss'
import { Link } from '@material-ui/core'
import { setShowAuth } from '../redux/actions'
import { useDispatch } from 'react-redux'


const Header = () => {

    const dispatch = useDispatch()
    
    function login(){
        const body = document.querySelector("body")
        body.style.overflow = "hidden"
        dispatch(setShowAuth(true))
    }


    return (
        <div className={styles.header}>
            <div className={styles.logo}>
                <Link href="/"><a>LO/GO</a></Link>
            </div>
            <div className={styles.headerButtons}>
                <div className={styles.button}>
                    <Link href="/wynajecie"><a>Wynajmij biuro</a></Link>
                </div>
                <button className={styles.loginButton} onClick={login}>Zaloguj się</button>
            </div>
        </div>
    )
}

export default Header
