import React from 'react'
import styles from "../../styles/Wynajecie.module.scss"
import headerStyles from "../../styles/Header.module.scss"
import { useSelector } from 'react-redux'


const WynajecieTitleTwo = () => {

    const language = useSelector(state=>state.language)

    return (
        <>
            {language === 'pl' && 
                    <div className={styles.servicesTitle}>2. WYBIERZ 
                        <span className={styles.boldFont}> CZAS TRWANIA UMOWY</span>
                    </div>
            }
            {language === 'ua' && 
                <div className={styles.servicesTitle}>2. виберіть 
                    <span className={styles.boldFont}> тривалість&nbsp;договору</span>
                </div>
            }        
        </>
    )
}

export default WynajecieTitleTwo
