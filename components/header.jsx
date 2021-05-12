import React, { useEffect } from 'react'
import styles from '../styles/Header.module.scss'
import { setShowAuth } from '../redux/actions'
import { useDispatch, useSelector } from 'react-redux'
import Link from 'next/link'
import Logo from './logo'
import { email } from '../accessories/constants'


const Header = () => {

    const currentUser = useSelector(state=>state.currentUser)
    const packages = useSelector(state=>state.packages)

    const dispatch = useDispatch()

    useEffect(()=>{
        console.log('header current user', currentUser)
    }, [currentUser])
    
    function login(){
        const body = document.querySelector("body")
        body.style.overflow = "hidden"
        dispatch(setShowAuth({show: true}))
    }


    return (
        <div className={styles.header}>
            <div className={styles.logo}>
                <Link href="/"><a>
                    <Logo scale={1.0}/>
                </a></Link>
            </div>
            <div className={styles.headerButtons}>
                <div className={styles.contacts}>
                    <div className={styles.email}><a href={`mailto://${email}`}>{email}</a></div>
                    <div className={styles.phone}><a href="tel:+48602779599">+48 602 77 95 99</a></div>
                </div>
                {((packages && packages.length === 0) || currentUser===false) && <div className={styles.button}>
                    <Link href="/wynajecie"><a>Wynajmij adres</a></Link>
                </div>}
                {(!currentUser && currentUser !== null) && <button className={styles.loginButton} onClick={login}>Zaloguj się</button>}
                {currentUser && <div className={styles.profileButton} >
                        <Link href="/konto/profil"><a>profil</a></Link>
                    </div>}
                {currentUser === null && <button className={styles.plug}></button>}
            </div>
        </div>
    )
}

export default Header
