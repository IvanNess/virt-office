import React from 'react'
import Billboard from '../components/billboard'

import styles from '../styles/Cennik.module.scss'
import Header from '../components/header'
import Sidebar from '../components/side-bar'
import CennikTable from '../components/cennik-table'
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

            <div className={styles.blocks}>
                
                <div className={styles.block}>
                    <div className={styles.blockTitle}>Wirtualny adres</div>
                    <div className={styles.digit}>55</div>
                    <div className={styles.afterDigit}>PLN/miesiąc</div>
                    <div className={styles.blockLinkButton}>
                        <Link href="/wynajecie"><a>Wynajmij biuro</a></Link>
                    </div>
                    <div className={styles.description}>
                        <p>
                            - adres na potrzeby rejestracji firmy 
                            <br/>
                            - powiadomienie o korespondencji 
                            <br/>
                            - skanowanie korespondencji i udostępnienie w chmurze * do 20 dokumentów miesięcznie do 100 MB 
                            <br/>
                            - archiwizacja dokumentów w zabezpieczonym pomieszczeniu * jeden segregator na jeden rok 
                            <br/>
                            - dostęp do sali konferencyjnej przez 2 godziny miesięcznie 
                            <br/>
                            <br/>
                            Cena nie zawiera VAT

                        </p>
                    </div>                    
                </div>

                <div className={styles.mainBlock}>
                    <div className={styles.blockTitle}>Twój pakiet</div>
                    <div className={styles.digit}>?</div>
                    <div className={styles.afterDigit}>PLN/miesiąc</div>
                    <div className={styles.blockLinkButton}>
                        <Link href="/wynajecie"><a>Wynajmij biuro</a></Link>
                    </div>
                    <div className={styles.slash}>////</div>
                    <div className={styles.description}>
                        <p>
                            Tutaj klient wybiera dowolnie skład pakietu z dostępnych opcji
                            <br/>
                            <br/>
                            - adres na potrzeby rejestracji firmy 
                            <br/>
                            - powiadomienie o korespondencji 
                            <br/>
                            - skanowanie korespondencji i udostępnienie w chmurze * do ilości, licznik od 20] dokumentów miesięcznie 
                            <br/>
                            - archiwizacja dokumentów w zabezpieczonym pomieszczeniu * segregatorów na lat 
                            <br/>
                            - wysyłanie korespondencji na wskazany adres 1 raz w tygodniu 
                            <br/>
                            - dostęp do sali konferencyjnej przez godzin miesięcznie 
                            <br/>
                            - biuro rachunkowe 
                            <br/>
                            <br/>
                            Cena nie zawiera VAT
                        </p>
                    </div>                    
                </div>

                <div className={styles.block}>
                    <div className={styles.blockTitle}>Profesjonalne biuro</div>
                    <div className={styles.digit}>450</div>
                    <div className={styles.afterDigit}>PLN/miesiąc</div>
                    <div className={styles.blockLinkButton}>
                        <Link href="/wynajecie"><a>Wynajmij biuro</a></Link>
                    </div>
                    <div className={styles.description}>
                        <p>
                            - adres na potrzeby rejestracji firmy <br/>
                            - powiadomienie o korespondencji <br/>
                            - nielimitowana liczba skanowanych dokumentów i udostępnienie w chmurze do 2 GB <br/>
                            - archiwizacja dokumentów w zabezpieczonym pomieszczeniu * pięć segregatorów na jeden rok <br/>
                            - wysyłanie korespondencji na wskazany adres 1 raz w tygodniu <br/>
                            - dostęp do sali konferencyjnej przez 10 godzin miesięcznie <br/>
                            - biuro rachunkowe <br/>
                            <br/>
                            Cena nie zawiera VAT
                        </p>
                    </div>                    
                </div>
            </div>

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
