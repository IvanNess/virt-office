import React from 'react'
import TwitterIcon from '@material-ui/icons/Twitter'
import FacebookIcon from '@material-ui/icons/Facebook'
import InstagramIcon from '@material-ui/icons/Instagram'

import styles from '../styles/MenuContent.module.scss'
import { Link } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { setShowAuth } from '../redux/actions'

const MenuContent = () => {

    const dispatch = useDispatch()

    const showAuth = useSelector(state=>state.showAuth)

    function onAuth(isLogin){
        dispatch(setShowAuth({show: true, isLogin}))
        const body = document.querySelector("body")
        body.style.overflow = "hidden"
    }

    return (
        <div className={styles.menuContent}>
            <div className={styles.iconsWrapper}>
                <Link><a href="/">
                    <div className={styles.logo}>LO/GO</div>
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
                <div><Link href="/podpis"><a><h2>wirtualny podpis</h2></a></Link></div>
                <div><Link href="/cennik"><a><h2 className={styles.last}>cennik</h2></a></Link></div>

                <div className={styles.split}></div>

                <div onClick={()=>onAuth(true)}><Link><a><h2 className={styles.first}>zaloguj</h2></a></Link></div>
                <div onClick={()=>onAuth(false)}><Link><a><h2>zarejestruj</h2></a></Link></div>
                
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
