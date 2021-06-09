import React from 'react'
import styles from '../../styles/Home.module.scss'
import { useSelector } from 'react-redux'


const HeaderTwo = () => {

    const language = useSelector(state=>state.language)

    return (
        <div className={styles.headerTwo}>
            {language === 'pl' && 
                <div className={styles.headerFlex}>
                    <div className={styles.headerTitle}>
                        <div className={styles.top}>
                            wszystkie potrzeby <span className={styles.headerBoldFont}>PRZEDSIĘBIORCY</span> w&nbsp;jednym pakiecie 
                        </div>
                        <div className={styles.bottom}>
                            <span className={styles.headerBoldFont}>ADRES</span> - obsługa biura – <span className={styles.headerBoldFont}>KSIĘGOWOŚĆ</span> – konsultacje prawne - <span className={styles.headerBoldFont}>MARKETING</span>
                        </div>
                    </div>
                    <div className={styles.headerText}>
                        <span className={styles.headerTextBoldFont}>ZARABIAJ </span>
                        koncentrując się na procesach, które przynoszą
                        <span className={styles.headerTextBoldFont}> ZYSK. </span>My zajmiemy się 
                        <span className={styles.headerTextBoldFont}> OPTYMALIZACJĄ KOSZTÓW, </span>
                        czyli pozostałymi procesami takimi jak obsługa korespondencji, wprowadzanie dokumentów do systemów księgowych, księgowość, marketing.
                    </div>
                </div>
            }
            {language === 'ua' && 
                <div className={styles.headerFlex}>
                    <div className={styles.headerTitle}>
                        <div className={styles.top}>
                            всі потреби для <span className={styles.headerBoldFont}>ПІДПРИЄМЦЯ</span> в&nbsp;одному пакеті 
                        </div>
                        <div className={styles.bottom}>
                            <span className={styles.headerBoldFont}>АДРЕСА</span> - офісні послуги – <span className={styles.headerBoldFont}>БУХГАЛТЕРІЯ</span> – юридичні консультації - <span className={styles.headerBoldFont}>МАРКЕТИНГ</span>
                        </div>
                    </div>
                    <div className={styles.headerText}>
                        <span className={styles.headerTextBoldFont}>ЗАРОБЛЯЙТЕ </span>
                            , зосереджуючись на процесах, які приносять вам 
                        <span className={styles.headerTextBoldFont}> ПРИБУТОК. </span>Ми подбаємо про  
                        <span className={styles.headerTextBoldFont}> ОПТИМІЗАЦІЮ ФІНАНСІВ</span>
                            , тобто іншими процесами, такі як обробка кореспонденції, бухгалтерський облік та маркетинг.
                    </div>
                </div>  
            }
            {language === 'en' &&             
                <div className={styles.headerFlex}>
                    <div className={styles.headerTitle}>
                        <div className={styles.top}>
                        all needs of the <span className={styles.headerBoldFont}>ENTREPRENEUR</span> in&nbsp;one package 
                        </div>
                        <div className={styles.bottom}>
                            <span className={styles.headerBoldFont}>ADRESS</span> - office services – <span className={styles.headerBoldFont}>ACCOUNTING</span> – legal consultations - <span className={styles.headerBoldFont}>MARKETING</span>
                        </div>
                    </div>
                    <div className={styles.headerText}>
                        <span className={styles.headerTextBoldFont}>EARN </span>
                        by focusing on processes that bring
                        <span className={styles.headerTextBoldFont}> PROFIT. </span>We will take care of 
                        <span className={styles.headerTextBoldFont}> COST OPTIMISATION, </span>
                        including correspondence handling, entering documents into accounting systems, accounting, marketing and other processes.                    
                    </div>
                </div>
            }

        </div>
    )
}

export default HeaderTwo
