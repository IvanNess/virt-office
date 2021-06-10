import React from 'react'
import styles from '../../styles/Cennik.module.scss'
import { useSelector } from 'react-redux'


const CennikHeader = () => {

    const language = useSelector(state=>state.language)

    return (
        <div className={styles.headerOne}>
            {language === 'pl' && 
                <>
                    <div className={styles.headerTitle}>
                        zobacz nasze<div className={styles.headerBoldFont}> ceny i usługi</div>
                    </div>
                    <div className={styles.headerText}>
                        Zarządzaj swoim biznesem z każdego miejsca o dowolnej porze
                    </div>
                </>
            }
            {language === 'ua' && 
                <>
                    <div className={styles.headerTitle}>
                        дивись наши<div className={styles.headerBoldFont}> ЦІНИ ТА ПОСЛУГИ</div>
                    </div>
                    <div className={styles.headerText}>
                        Керуйте своїм бізнесом з будь-якого місця та у будь-який час
                    </div>
                </>
            }        
        </div>
    )
}

export default CennikHeader
