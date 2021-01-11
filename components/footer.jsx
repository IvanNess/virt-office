import React from 'react'
import styles from '../styles/Footer.module.scss'
import { Link } from '@material-ui/core'
import TwitterIcon from '@material-ui/icons/Twitter'
import FacebookIcon from '@material-ui/icons/Facebook'
import InstagramIcon from '@material-ui/icons/Instagram'

const Footer = () => {
    return (
        <div className={styles.footer}>
            <div className={styles.wrapper}>
                <div className={styles.column}>
                    <Link href="/ksiegowosc"><a><h2>księgowość</h2></a></Link>
                    <Link href="/wirt-podpis"><a><h2>wirtualny Podpis</h2></a></Link>
                    <Link href="/pakiety"><a><h2>pakiety</h2></a></Link>
                    <Link href="/cennik"><a><h2 className={styles.last}>cennik</h2></a></Link>
                </div>
                <div className={styles.column}>
                    <div className={styles.columnWrapper}>
                        <Link href="/lokalizacje"><a><h2>lokalizacje</h2></a></Link>
                        <div className={styles.regions}>
                            <div className={styles.regionsOne}>
                                <Link href="/"><a>dolnośląskie</a></Link>
                                <Link href="/"><a>kujawsko-pomorskie</a></Link>
                                <Link href="/"><a>lubelskie</a></Link>
                                <Link href="/"><a>lubuskie</a></Link>
                                <Link href="/"><a>łódzkie</a></Link>
                                <Link href="/"><a>małopolskie</a></Link>
                                <Link href="/"><a>mazowieckie</a></Link>
                                <Link href="/"><a>opolskie</a></Link>
                            </div>
                            <div className={styles.regionsTwo}>
                                <Link href="/"><a>podkarpackie</a></Link>
                                <Link href="/"><a>podlaskie</a></Link>
                                <Link href="/"><a>pomorskie</a></Link>
                                <Link href="/"><a>śląskie</a></Link>
                                <Link href="/"><a>świętokrzyskie</a></Link>
                                <Link href="/"><a>warmińsko-mazurskie</a></Link>
                                <Link href="/"><a>wielkopolskie</a></Link>
                                <Link href="/"><a>zachodniopomorskie</a></Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.thirdColumn}>
                    <div className={styles.columnWrapper}>
                        <div className={styles.top}>
                            <Link href="/"><a><h2 className={styles.logo}>LO/GO</h2></a></Link>
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
