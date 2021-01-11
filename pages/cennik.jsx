import React from 'react'
import Billboard from '../components/billboard'

import styles from '../styles/Cennik.module.scss'
import Header from '../components/header'
import Sidebar from '../components/side-bar'
import CennikTable from '../components/cennik-table'

const Cennik = () => {
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
                <form className={styles.headerForm}>
                    <input className={styles.buttonInput} type="button" value="Wynajmij biuro"/>
                </form>
            </Billboard>

            <div className={styles.title}>
                Wirtualne Biuro <div className={styles.boldFont}>cennik</div>
            </div>

            <CennikTable/>

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
            </div>
        </div>
    )
}

export default Cennik
