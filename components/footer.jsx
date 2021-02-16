import React from 'react'
import styles from '../styles/Footer.module.scss'
import { Link } from '@material-ui/core'
import TwitterIcon from '@material-ui/icons/Twitter'
import FacebookIcon from '@material-ui/icons/Facebook'
import InstagramIcon from '@material-ui/icons/Instagram'
import { useDispatch, useSelector } from 'react-redux'
import { setShowAuth } from '../redux/actions'

const Footer = () => {

    const dispatch = useDispatch()

    const showAuth = useSelector(state=>state.showAuth)

    function onAuth(isLogin){
        dispatch(setShowAuth({show: true, isLogin}))
        const body = document.querySelector("body")
        body.style.overflow = "hidden"
    }

    return (
        <div className={styles.footer}>
            <div className={styles.wrapper}>
                <div className={styles.column}>
                    <div><Link href="/onas"><a><h2>o nas</h2></a></Link></div>
                    <div><Link href="/ksiegowosc"><a><h2>księgowość</h2></a></Link></div>
                    {/* <div><Link href="/wirt-podpis"><a><h2>wirtualny Podpis</h2></a></Link></div>
                    <div><Link href="/pakiety"><a><h2>pakiety</h2></a></Link></div> */}
                    <div><Link href="/cennik"><a><h2 className={styles.last}>cennik</h2></a></Link></div>     
                </div>
                <div className={styles.column}>
                    {/* <div className={styles.columnWrapper}>
                        <div><Link href="/lokalizacje"><a><h2>lokalizacje</h2></a></Link></div>
                        <div className={styles.regions}>
                            <div className={styles.regionsOne}>
                                <div><Link href=""><a>dolnośląskie</a></Link></div>
                                <div><Link href=""><a>kujawsko-pomorskie</a></Link></div>
                                <div><Link href=""><a>lubelskie</a></Link></div>
                                <div><Link href=""><a>lubuskie</a></Link></div>
                                <div><Link href=""><a>łódzkie</a></Link></div>
                                <div><Link href=""><a>małopolskie</a></Link></div>
                                <div><Link href=""><a>mazowieckie</a></Link></div>
                                <div><Link href=""><a>opolskie</a></Link></div>
                            </div>
                            <div className={styles.regionsTwo}>
                                <div><Link href=""><a>podkarpackie</a></Link></div>
                                <div><Link href=""><a>podlaskie</a></Link></div>
                                <div><Link href=""><a>pomorskie</a></Link></div>
                                <div><Link href=""><a>śląskie</a></Link></div>
                                <div><Link href=""><a>świętokrzyskie</a></Link></div>
                                <div><Link href=""><a>warmińsko-mazurskie</a></Link></div>
                                <div><Link href=""><a>wielkopolskie</a></Link></div>
                                <div><Link href=""><a>zachodniopomorskie</a></Link></div>
                            </div>
                        </div>
                    </div> */}
                    <div onClick={()=>onAuth(true)}><Link><a><h2 className={styles.first}>zaloguj</h2></a></Link></div>
                    <div onClick={()=>onAuth(false)}><Link><a><h2>zarejestruj</h2></a></Link></div>

                </div>
                <div className={styles.thirdColumn}>
                    <div className={styles.columnWrapper}>
                        <div className={styles.top}>
                            <div><Link href=""><a><h2 className={styles.logo}>LO/GO</h2></a></Link></div>
                            <div className={styles.textOne}>Działaj z dowolnego miejsca na świecie dzięki opcji biura wirtualnego.</div>
                            <div className={styles.textTwo}>Skontaktuj sie z nami: 
                                <span className={styles.bold}>{` zawodzie20@biuro.pl`}</span>
                            </div>
                        </div>
                        <div className={styles.bottom}>
                            <TwitterIcon style={{fontSize: '27px', color: '#FFFFFF'}}/>
                            <FacebookIcon style={{fontSize: '27px', color: '#FFFFFF'}}/>
                            <InstagramIcon style={{fontSize: '27px', color: '#FFFFFF'}}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer
