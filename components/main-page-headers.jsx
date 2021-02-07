import React, { useState, useEffect } from 'react'
import styles from '../styles/MainPageHeaders.module.scss'

function MainPageHeaders() {

    const timeout = 8000

    const [currentHeaderId, setCurrentHeaderId] = useState(0)

    function changeCurrentHeaderId(currentHeaderId){
        setCurrentHeaderId(currentHeaderId)
        setTimeout(()=>{
            const newCurrentHeaderId = currentHeaderId+1 === 3 ? 0 : currentHeaderId+1
            changeCurrentHeaderId(newCurrentHeaderId)
        }, timeout)
    }

    useEffect(()=>{
        changeCurrentHeaderId(currentHeaderId)
    }, [])

    return (
        <div className={styles.mainPageHeaders}>
            <div className={currentHeaderId===0 ? styles.show : styles.none}>
                <div className={styles.headerOne}>
                    <div className={styles.headerTitle}>
                        optymalne koszty prowadzenia firmy dzięki <span className={styles.headerBoldFont}>WIRTUALNYM</span> biurom już od 55 PLN miesięcznie
                    </div>
                    <div className={styles.headerText}>
                        NIEWIELKIE STAŁE KOSZTY funkcjonowania firmy dają możliwość efektywniejszego zarabiania. Specyfika niektórych rodzajów działalności daje możliwość OSZCZĘDNOŚCI na wynajmie przestrzeni biurowych WYKORZYSTAJCIE to i ZARABIAJCIE WIĘCEJ.
                    </div>
                </div>
            </div>

            <div className={currentHeaderId===1 ? styles.show : styles.none}>
                <div className={styles.headerTwo}>
                    <div className={styles.headerTitle}>
                        <div className={styles.top}>
                            wszystkie potrzeby <span className={styles.headerBoldFont}>PRZEDSIĘBIORCY</span> w jednym pakiecie 
                        </div>
                        <div className={styles.bottom}>
                            <span className={styles.headerBoldFont}>ADRES</span> - obsługa biura – <span className={styles.headerBoldFont}>KSIĘGOWOŚĆ</span> – konsultacje prawne - <span className={styles.headerBoldFont}>MARKETING</span>
                        </div>
                    </div>
                    <div className={styles.headerText}>
                        ZARABIAJ  koncentrując się na procesach, które przynoszą ZYSK. My zajmiemy się OPTYMALIZACJĄ KOSZTÓW, czyli pozostałymi procesami takimi jak obsługa korespondencji, wprowadzanie dokumentów do systemów księgowych, księgowość, marketing.
                    </div>
                </div>
            </div>

            <div className={styles.headerThree}>
                <div className={currentHeaderId===2 ? styles.show : styles.none}>
                    <div className={styles.headerTitle}>
                        nie tylko <span className={styles.headerBoldFont}>WIRTUALNE</span> – w ramach oferty można korzystać z <span className={styles.headerBoldFont}>PRZESTRZENI KONFERENCYJNEJ</span> oznakowanej <span className={styles.headerBoldFont}>LOGIEM</span> własnej firmy
                    </div>
                    <div className={styles.headerText}>
                        Czasami trzeba się SPOTKAĆ dlatego udostępniamy pod adresem rejestracji firmy PRZESTRZEŃ KONFERENCYJNĄ gdzie można przy jednym stole i dobrej „kawie" przeprowadzić negocjacje i podpisać LUKRATYWNE KONTRAKTY.                </div>
                </div>
            </div>
            
        </div>
    )
}

export default MainPageHeaders
