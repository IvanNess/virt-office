import React from 'react'
import Billboard from '../components/billboard'

import styles from '../styles/Cennik.module.scss'
import Header from '../components/header'
import Sidebar from '../components/side-bar'
import CennikChoices from '../components/cennik-choices'
import Link from 'next/link'
import Block from '../components/block'
import Footer from '../components/footer'
import { useState } from 'react'

const Cennik = () => {

    const [currentCennikId, setCurrentCennikId]  = useState(1)

    function barClicked(e){
        const id = e.target.dataset.id
        setCurrentCennikId(Number(id))        
    }



    return (
        <div className={styles.cennik}>
            <Sidebar/>

            <Billboard>
                <Header/>
                <div className={styles.headerTitle}>
                    zobacz nasze<div className={styles.headerBoldFont}> ceny i usługi</div>
                </div>
                <div className={styles.headerText}>
                    Zarządzaj swoim biznesem z każdego miejsca o dowolnej porze
                </div>
                <div className={styles.linkButtonWrapper}>
                    <div className={styles.linkButton}>
                        <Link href='/wynajecie'><a>Wynajmij biuro</a></Link>
                    </div> 
                </div>
            </Billboard>

            <div className={styles.title}>
                Wirtualne Biuro /<span className={styles.boldFont}> cennik</span>
            </div>

            <div className={styles.cennikBar} onClick={barClicked}>
                <div className={currentCennikId===1 ? styles.selectedItem : styles.barItem} data-id={1}>WIRTUALNE BIURO</div>
                {/* <div className={currentCennikId===2 ? styles.selectedItem : styles.barItem} data-id={2}>Fakturowanie i sprzedaż</div>
                <div className={currentCennikId===3 ? styles.selectedItem : styles.barItem} data-id={3}>Księgowość online</div>
                <div className={currentCennikId===4 ? styles.selectedItem : styles.barItem} data-id={4}>Kadry, płace i ubezpieczenia</div> */}
            </div>

            <CennikChoices/>

            <Footer/>

            {/* <CennikTable/>

            <div className={styles.info}>
                Rabat na kolejną firmę 10% 
                <br/>
                <br/>
                <br/>
                Usługi dodatkowe: 
                <ul>
                    <li>Wysyłka korespondencji przychodzącej na żądanie: 10 zł
                        <br/>
                         + koszty poczty polskiej (list zwykły lub polecony)
                    </li>
                    <li>Ksero czarno białe 1 zł / kolor 2 zł - strona</li>
                    <li>Druk czarno biały 1 zł / kolor 2 zł - strona</li>
                    <li>Cennik obowiązuje od dnia 01.01.2015 Do powyższych cen należy doliczyć 23 % podatku Vat.</li>
                </ul>
            </div> */}
        </div>
    )
}

export default Cennik
