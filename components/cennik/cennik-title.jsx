import React from 'react'
import styles from '../../styles/Cennik.module.scss'
import { useSelector } from 'react-redux'


const CennikTitle = () => {

    const language = useSelector(state=>state.language)

    return (
        <>
            {language === 'pl' && 
                <div className={styles.title}>
                    Wirtualne Biuro /<span className={styles.boldFont}> cennik</span>
                </div>
            }
            {language === 'ua' && 
                <div className={styles.title}>
                    віртуальний офіс / <span className={styles.boldFont}> прайс-лист</span>
                </div>
            }      
        </>
    )
}

export default CennikTitle
