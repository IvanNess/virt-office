import React from 'react'
import styles from '../../styles/Home.module.scss'
import { useSelector } from 'react-redux'


const HeaderOne = () => {

    const language = useSelector(state=>state.language)

    return (
        <div className={styles.headerOne}>
            {language === 'pl' && 
                <div className={styles.headerFlex}>
                    <div className={styles.headerTitle}>
                        optymalne koszty prowadzenia firmy dzięki <span className={styles.headerBoldFont}>WIRTUALNYM</span> biurom już od <span className={styles.headerBoldFont}>55 PLN </span> miesięcznie
                    </div>
                    <div className={styles.headerText}>
                        <span className={styles.headerTextBoldFont}>NIEWIELKIE STAŁE KOSZTY </span>
                        funkcjonowania firmy dają możliwość efektywniejszego zarabiania. Specyfika niektórych rodzajów działalności daje możliwość 
                        <span className={styles.headerTextBoldFont}> OSZCZĘDNOŚCI </span>
                        na wynajmie przestrzeni biurowych.
                        <span className={styles.headerTextBoldFont}> WYKORZYSTAJ </span>
                        to i <span className={styles.headerTextBoldFont}>ZARABIAJ WIĘCEJ.</span>
                    </div>
                </div>  
            }
            {language === 'ua' && 
                <div className={styles.headerFlex}>
                    <div className={styles.headerTitle}>
                        оптимальні витрати на ведення бізнесу завдяки <span className={styles.headerBoldFont}>ВІРТУАЛЬНОМУ </span> офісу від <span className={styles.headerBoldFont}>55 ЗЛОТИХ  </span> НА місяць 
                    </div>
                    <div className={styles.headerText}>
                        <span className={styles.headerTextBoldFont}>НЕВЕЛИКІ  ФІКСОВАНІ ВИТРАТИ </span>
                        для роботи компанії дозволяють заробляти ефективніше. Специфіка деяких видів бізнесу дозволяє 
                        <span className={styles.headerTextBoldFont}> ЗАОЩАДЖУВАТИ </span>
                        на оренді офісного приміщеня.
                        <span className={styles.headerTextBoldFont}> ТА  ЗАРОБЛЯТИ БІЛЬШЕ.</span>
                    </div>
                </div>  
            }
            {language === 'en' && 
                <div className={styles.headerFlex}>
                    <div className={styles.headerTitle}>
                        optimum business costs thanks to <span className={styles.headerBoldFont}>VIRTUAL</span> offices from <span className={styles.headerBoldFont}>55 PLN </span> per month
                    </div>
                    <div className={styles.headerText}>
                        <span className={styles.headerTextBoldFont}>LOW FIXED BUSINESS COSTS </span>
                        enable you to earn more efficiently. The specificity of some kinds of business makes it possible to 
                        <span className={styles.headerTextBoldFont}> SAVE ON </span>
                        the lease of office space -
                        <span className={styles.headerTextBoldFont}> USE THIS OPPORTUNITY </span>
                        and <span className={styles.headerTextBoldFont}>EARN MORE.</span>
                    </div>
                </div>  
            }
        </div>
    )
}

export default HeaderOne
