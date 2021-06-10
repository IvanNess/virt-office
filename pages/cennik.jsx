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
import WynajmijButton from '../components/wynajmij-button'
import Line from '../components/line'
import CennikHeader from '../components/cennik/cennik-header'
import CennikTitle from '../components/cennik/cennik-title'

const Cennik = ({auth}) => {

    const [currentCennikId, setCurrentCennikId]  = useState(1)

    function barClicked(e){
        const id = e.target.dataset.id
        setCurrentCennikId(Number(id))        
    }



    return (
        <div className={styles.cennik}>
            <Sidebar auth={auth}/>

            <Line/>

            <Billboard>
                <Header/>
                <CennikHeader/>
                <WynajmijButton/>
            </Billboard>

            <div style={{margin: 'auto', maxWidth: '1440px'}}>
                
                <CennikTitle/>

                <div className={styles.cennikBar} onClick={barClicked}>
                    {/* <div className={currentCennikId===1 ? styles.selectedItem : styles.barItem} data-id={1}>WIRTUALNE BIURO</div>
                    <div className={currentCennikId===2 ? styles.selectedItem : styles.barItem} data-id={2}>Fakturowanie i sprzedaż</div>
                    <div className={currentCennikId===3 ? styles.selectedItem : styles.barItem} data-id={3}>Księgowość online</div>
                    <div className={currentCennikId===4 ? styles.selectedItem : styles.barItem} data-id={4}>Kadry, płace i ubezpieczenia</div> */}
                </div>

                <CennikChoices/>

            </div>

            <Footer auth={auth}/>


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
