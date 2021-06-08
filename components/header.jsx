import React, { useEffect } from 'react'
import styles from '../styles/Header.module.scss'
import { setShowAuth } from '../redux/actions'
import { useDispatch, useSelector } from 'react-redux'
import Link from 'next/link'
import Logo from './logo'
import { email, pathnames, buttonNames } from '../accessories/constants'
import { useRouter } from 'next/router'


const Header = () => {

    const currentUser = useSelector(state=>state.currentUser)
    const packages = useSelector(state=>state.packages)
    const language = useSelector(state=>state.language)

    const dispatch = useDispatch()

    const router = useRouter()

    useEffect(()=>{
        console.log('header current user', currentUser)
    }, [currentUser])
    
    function login(){
        const body = document.querySelector("body")
        body.style.overflow = "hidden"
        dispatch(setShowAuth({show: true}))
    }

    const PathInner =()=>(
        <div className={styles.pathInner}>
            {
                router.pathname === '/' ? pathnames[language].home : 
                router.pathname === '/cennik' ? pathnames[language].cennik : 
                router.pathname === '/ksiegowosc' ? pathnames[language].ksiegowosc : 
                router.pathname === '/polityka-prywatnosci' ? pathnames[language].polityka : 
                router.pathname === '/regulamin' ? pathnames[language].regulamin : ''
            }
        </div> 
    )


    return (
        <div className={styles.headerWrapper}>
            <div className={styles.header}>
                <div className={styles.top}>
                    <div className={styles.logoNPath}>
                        <div className={styles.logo}>
                            <Link href="/"><a>
                                <Logo scale={1.0}/>
                            </a></Link>
                        </div>
                        <div className={styles.path}>
                            <PathInner/> 
                        </div> 
                    </div>
                    
                    <div className={styles.headerButtons}>
                        <div className={styles.contacts}>
                            <div className={styles.email}><a href={`mailto://${email}`}>{email}</a></div>
                            <div className={styles.phone}><a href="tel:+48602779599">+48&nbsp;602&nbsp;77&nbsp;95&nbsp;99</a></div>
                        </div>
                        <div className={styles[language==='ua'?'uabuttons':'buttons']}>
                            {((packages && packages.length === 0) || currentUser===false) && <div className={styles.button}>
                                <Link href="/wynajecie"><a>{buttonNames[language].wynajecie}</a></Link>
                            </div>}
                            {(!currentUser && currentUser !== null) && <button className={styles.loginButton} onClick={login}>{buttonNames[language].login}</button>}
                            {currentUser && <div className={styles.profileButton} >
                                    <Link href="/konto/profil"><a>{buttonNames[language].profil}</a></Link>
                                </div>}
                            {currentUser === null && <button className={styles.plug}></button>}
                        </div>                
                    </div>
                </div>

                <div className={styles.bottom}>
                    
                </div>
            </div>
            <PathInner/>
        </div>
        
    )
}

export default Header
