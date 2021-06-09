import React from 'react'
import styles from '../../styles/Home.module.scss'
import { useSelector } from 'react-redux'


const HeaderThree = () => {

    const language = useSelector(state=>state.language)

    return (
        <div className={styles.headerThree}>
            {language === 'pl' && 
                <div className={styles.headerFlex}>
                    <div className={styles.headerTitle}>
                        nie tylko <span className={styles.headerBoldFont}>WIRTUALNE</span> – w ramach oferty można korzystać z <span className={styles.headerBoldFont}>PRZESTRZENI KONFERENCYJNEJ</span> oznakowanej <span className={styles.headerBoldFont}>LOGIEM</span> własnej firmy
                    </div>
                    <div className={styles.headerText}>
                        Czasami trzeba się 
                        <span className={styles.headerTextBoldFont}> SPOTKAĆ </span>
                        dlatego udostępniamy pod adresem rejestracji firmy
                        <span className={styles.headerTextBoldFont}> PRZESTRZEŃ KONFERENCYJNĄ. </span>
                        Przy jednym stole i dobrej „kawie" można przeprowadzić negocjacje i podpisać 
                        <span className={styles.headerTextBoldFont} > LUKRATYWNE KONTRAKTY.</span>                
                    </div>
                </div>
            }
            {language === 'ua' && 
                <div className={styles.headerFlex}>
                    <div className={styles.headerTitle}>
                        Віртуальна пропозиція - не тільки як частина послуги, ви можете використовувати <span className={styles.headerBoldFont}>КОНФЕРЕНЦ ЗАЛОМ  </span>
                        {/* oznakowanej <span className={styles.headerBoldFont}>LOGIEM</span> własnej firmy */}
                    </div>
                    <div className={styles.headerText}>
                        Часом  треба проводити  
                        <span className={styles.headerTextBoldFont}> ДІЛОВІ ЗУСТРІЧИ </span>
                        , тому ми пропонуємо 
                        <span className={styles.headerTextBoldFont}> КОНФЕРЕНЦІЙНИЙ ПРОСТІР </span>
                        за адресою реєстрації компанії, де ви можете підписувати  
                        <span className={styles.headerTextBoldFont} > НОВІ КОНТРАКТИ </span>   
                        за одним столом з партнером за чашкою кави.             
                    </div>
                </div>            
            }
            {language === 'en' && 
                <div className={styles.headerFlex}>
                    <div className={styles.headerTitle}>
                        not only <span className={styles.headerBoldFont}>VIRTUALLY</span> – our offer allows you to use a <span className={styles.headerBoldFont}>CONFERENCE SPACE</span> marked with the <span className={styles.headerBoldFont}>LOGO </span> of your own company
                    </div>
                    <div className={styles.headerText}>
                        It is necessary to 
                        <span className={styles.headerTextBoldFont}> MEET </span>
                        from time to time, so we put a 
                        <span className={styles.headerTextBoldFont}> CONFERENCE SPACE </span>
                        at your disposal at the business registration address, where you can hold negotiations and sign 
                        <span className={styles.headerTextBoldFont} > LUCRATIVE CONTRACTS </span> at one table with a cup of good “coffee”.
                    </div>
                </div>
            }

        </div>
    )
}

export default HeaderThree
