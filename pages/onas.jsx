import React from 'react'
import styles from '../styles/Onas.module.scss'
import Billboard from '../components/billboard'
import Sidebar from '../components/side-bar'
import Header from '../components/header'
import TwitterIcon from '@material-ui/icons/Twitter'
import FacebookIcon from '@material-ui/icons/Facebook'
import InstagramIcon from '@material-ui/icons/Instagram'
import Footer from '../components/footer'

function Onas({auth}) {
    return (
        <div className={styles.onas}>
            <Sidebar auth={auth}/>

            <Billboard parentModule='onas'>
                <Header/>
                <div className={styles.headerTitle}>
                    Napisz do <span className={styles.headerBoldFont}>Nas</span> 
                </div>
                <div className={styles.headerText}>
                    MYŚLIMY O BIZNESIE JAKO O NATURALNYM POMOŚCIE MIĘDZY POTRZEBAMI A TECHNOLOGIĄ
                </div>
            </Billboard>

            <div className={styles.onasBody}>
                <div className={styles.left}>
                    <div className={styles.title}>
                        Działaj z dowolnego miejsca na świecie dzięki opcji biura wirtualnego.
                    </div>
                    <div className={styles.textOne}>
                        Skontaktuj sie z nami: 
                    </div>
                    <div className={styles.textTwo}>
                        zawodzie20@biuro.pl 
                        456 876 567 
                        <br/>
                        <br/>
                        Zawodzie 20, 
                        80-726 Gdańsk
                    </div>
                </div>
                <div className={styles.right}>
                    <TwitterIcon style={{fontSize: '27px', color: '#121109'}}/>
                    <div className={styles.space}></div>
                    <FacebookIcon style={{fontSize: '27px', color: '#121109'}}/>
                    <div className={styles.space}></div>
                    <InstagramIcon style={{fontSize: '27px', color: '#121109'}}/>
                </div>
            </div>

            <Footer/>
        </div>
    )
}

export default Onas
