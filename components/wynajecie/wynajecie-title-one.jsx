import React from 'react'
import styles from "../../styles/Wynajecie.module.scss"
import headerStyles from "../../styles/Header.module.scss"
import { useSelector } from 'react-redux'


const WynajecieTitleOne = () => {

    const language = useSelector(state=>state.language)

    return (
        <>
            {language === 'pl' && 
                <div className={styles.servicesTitle}>1. WYBÓR USŁUGI
                    <span className={styles.boldFont}> BIURA WIRTUALNEGO</span>
                </div>
            }
            {language === 'ua' && 
                <div className={styles.servicesTitle}>1. вибір  тарифа 
                    <span className={styles.boldFont}> виртуального&nbsp;офісу</span>
                </div>
            } 
            {language === 'en' && 
                <div className={styles.servicesTitle}>1. WYBÓR USŁUGI
                    <span className={styles.boldFont}> BIURA WIRTUALNEGO</span>
                </div>
            }       
        </>
    )
}

export default WynajecieTitleOne
