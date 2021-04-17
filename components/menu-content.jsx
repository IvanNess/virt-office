import React, { useEffect } from 'react'
import TwitterIcon from '@material-ui/icons/Twitter'
import FacebookIcon from '@material-ui/icons/Facebook'
import InstagramIcon from '@material-ui/icons/Instagram'

import styles from '../styles/MenuContent.module.scss'
// import { Link } from 'next/link'
import { useDispatch, useSelector } from 'react-redux'
import { setShowAuth, setShowMenu } from '../redux/actions'
import { useClickOutside } from 'react-click-outside-hook'
import axios from 'axios'
import Logo from './logo'
import Link from 'next/link'

const MenuContent = ({auth}) => {

    const dispatch = useDispatch()

    useEffect(()=>{
        console.log('menu context auth', auth)
        async function fetchReservedSessions(){
            const data = await axios({
                url: "/api/reservedsessions",
                method: "POST",
                data: {
                    year: "2021",
                    month: "02",
                    day: "22"
                }
            })
            console.log(data)
        }
        // fetchReservedSessions()
    }, [])

    const showAuth = useSelector(state=>state.showAuth)
    const [ref, hasClickedOutside] = useClickOutside()
    const currentUser = useSelector(state=>state.currentUser)

    function onAuth(isLogin){
        dispatch(setShowAuth({show: true, isLogin}))
        dispatch(setShowMenu(false))
        const body = document.querySelector("body")
        body.style.overflow = "hidden"
    }

    useEffect(() => {
        if(hasClickedOutside){
            dispatch(setShowMenu(false))
        }
    }, [hasClickedOutside])

    async function logout(){
        try {
            await auth.signOut()
            // router.push('/')
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className={styles.menuContent} ref={ref}>
            <div className={styles.iconsWrapper}>
                <Link href="/"><a>
                    <Logo/>
                </a></Link>
                <div className={styles.icons}>
                    <Link href="/"><a><TwitterIcon style={{fontSize: '27px', color: '#FFFFFF'}}/></a></Link>
                    <Link href="/"><a><FacebookIcon style={{fontSize: '27px', color: '#FFFFFF'}}/></a></Link>
                    <Link href="/"><a><InstagramIcon style={{fontSize: '27px', color: '#FFFFFF'}}/></a></Link>
                </div>
            </div>

            <div className={styles.textOne}>Działaj z dowolnego miejsca na świecie dzięki opcji biura wirtualnego.</div>

            <div className={styles.textTwo}>Skontaktuj sie z nami: 
                <span className={styles.bold}>{` zawodzie20@biuro.pl`}</span>
            </div>

            <div className={styles.options}>
                <div><Link href="/onas"><a><h2>o nas</h2></a></Link></div>
                <div><Link href="/ksiegowosc"><a><h2>księgowość</h2></a></Link></div>
                {/* <div><Link href="/podpis"><a><h2>wirtualny podpis</h2></a></Link></div> */}
                <div><Link href="/cennik"><a><h2 className={styles.last}>cennik</h2></a></Link></div>

                <div className={styles.split}></div>

                {currentUser===false && <div onClick={()=>onAuth(true)}>
                    <h2 className={styles.first}>zaloguj</h2>
                </div>}
                {currentUser===false && <div onClick={()=>onAuth(false)}>
                    <h2>zarejestruj</h2>
                </div>}

                {currentUser && <div onClick={logout}>
                    <h2 className={styles.first}>wyloguj</h2 >
                </div>}

                {/* <Link href="/pakiety"><a><h2>pakiety</h2></a></Link>
                
                <Link href="/localizacje"><a><h2 className={styles.last}>localizacje</h2></a></Link> */}
            </div>

            {/* <div className={styles.cities}>
                <div className={styles.cityWrapper}><p>Poznań</p></div>
                <div className={styles.cityWrapper}><p>Warszawa</p></div>
                <div className={styles.cityWrapper}><p>Kraków</p></div>
                <div className={styles.cityWrapper}><p>Gdańsk</p></div>
                <div className={styles.cityWrapper}><p>Gdynia</p></div>
                <div className={styles.cityWrapper}><p>Toruń</p></div>
                <div className={styles.cityWrapper}><p>Sandomierz</p></div>
                <div className={styles.cityWrapper}><p>Sopot</p></div>
                <div className={styles.cityWrapper}><p>Tczew</p></div>          
            </div> */}
        </div>
    )
}

export default MenuContent
