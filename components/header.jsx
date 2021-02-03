import React, { useEffect } from 'react'
import styles from '../styles/Header.module.scss'
import { setShowAuth } from '../redux/actions'
import { useDispatch, useSelector } from 'react-redux'
import Link from 'next/link'


const Header = () => {

    const currentUser = useSelector(state=>state.currentUser)

    const dispatch = useDispatch()

    useEffect(()=>{
        console.log('header current user', currentUser)
    }, [currentUser])
    
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
                {(!currentUser && currentUser !== null) && <button className={styles.loginButton} onClick={login}>Zaloguj się</button>}
                {currentUser && <div className={styles.profileButton} >
                        <Link href="/konto/profil"><a>profile page</a></Link>
                    </div>}
                {currentUser === null && <button className={styles.plug}></button>}
            </div>
        </div>
    )
}

export default Header
