import React from 'react'

import styles from '../styles/Podpis.module.scss'
import Billboard from '../components/billboard'
import Header from '../components/header'
import Sidebar from '../components/side-bar'
import Link from 'next/link'
import Block from '../components/block'

function Podpis({auth}) {
    const Hyphen = ()=> <span className={styles.hyphen}>&mdash;&mdash;&mdash;&mdash;&mdash;</span>

    return (
        <div className={styles.podpis}>
            <Sidebar auth={auth}/>

            <Billboard>
                <Header/>
                <div className={styles.headerTitle}>
                    Wirtualny podpis od firmy <span className={styles.headerBoldFont}>coblit</span> 
                </div>
                <div className={styles.headerText}>
                    MYŚLIMY O BIZNESIE JAKO O NATURALNYM POMOŚCIE MIĘDZY POTRZEBAMI A TECHNOLOGIĄ
                </div>
                <div className={styles.linkButtonWrapper}>
                    <div className={styles.linkButton}>
                        <Link href='/wynajecie'><a cl>Wynajmij biuro</a></Link>
                    </div> 
                </div>
            </Billboard>

            <div className={styles.title}>
                O <span className={styles.boldFont}>coblit</span>
            </div>
            <div className={styles.smallText}>
                Coblit to doświadczona firma technologiczna specjalizująca się w tworzeniu oprogramowania, sile roboczej i usługach logistycznych. Nasze główne kompetencje obejmują zaawansowane i dedykowane aplikacje (internetowe i mobilne), projektowanie stron internetowych wraz z kampaniami w mediach społecznościowych, outsourcing i rekrutacja Manpower oraz usługi logistyczne.
            </div>

            <div className={styles.blocks}>
                <Block className='blockMedium'>
                    <div className={styles.blockTitle}>
                        Menedżer sprzedaży
                    </div>
                    <div className={styles.blockText}><Hyphen/><div className={styles.afterHyphen}>Chcielibyśmy być jednym z najwybitniejszych (top 10) dostawców dedykowanych rozwiązań biznesowych w całej Europie.</div></div>
                </Block>
                <Block className='blockMedium'>
                    <div className={styles.blockTitle}>
                        Kadry i płace
                    </div>
                    <div className={styles.blockText}><Hyphen/><div className={styles.afterHyphen}>Zwiększenie efektywności naszych partnerów / klientów dzięki dostarczanym przez nas rozwiązaniom. Być rozpoznawalnym na rynku jako wieloletni, niezawodny partner.</div></div>
                </Block>
                <Block className='blockMedium'>
                    <div className={styles.blockTitle}>
                        Księgowość online
                    </div>
                    <div className={styles.blockText}><Hyphen/><div className={styles.afterHyphen}>Jakość</div></div>
                    <div className={styles.blockText}><Hyphen/><div className={styles.afterHyphen}>Elastyczność</div></div>
                    <div className={styles.blockText}><Hyphen/><div className={styles.afterHyphen}>Odpowiedzialność</div></div>
                </Block>   
            </div>

            <div className={styles.titleTwo}>
                <span className={styles.boldFont}>MYŚLIMY O BIZNESIE JAKO O NATURALNYM POMOŚCIE MIĘDZY POTRZEBAMI A TECHNOLOGIĄ</span>
            </div>

        </div>
    )
}

export default Podpis
