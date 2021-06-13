import React from 'react'
import styles from '../../styles/Ksiegowosc.module.scss'
import { useSelector } from 'react-redux'


const KsiegowoscTitleOne = () => {

    const language = useSelector(state=>state.language)

    return (
        <>
            {language === 'pl' && 
                <div className={styles.title}>
                    Ponad <span className={styles.boldFont}> 700 nowych </span>
                    przedsiębiorców wybiera serwis księgowy 
                    <span className={styles.boldFont}><a href ='https://wfirma.pl'>wFirma.pl</a></span> każdego tygodnia
                </div>
            }
             {language === 'ua' && 
                <div className={styles.title}>
                    
                    більш <span className={styles.boldFont}> 700 нових </span>
                    підприємців вибирають <span className={styles.boldFont}><a href ='https://wfirma.pl'>wFirma.pl</a></span> бухгатерський сервіс щотижня 
                </div>
            }   
            {language === 'en' && 
                <div className={styles.title}>
                    over <span className={styles.boldFont}> 700 new </span>
                    entrepreneurs choose the&nbsp;<span className={styles.boldFont}><a href ='https://wfirma.pl'>wFirma.pl</a></span> portal every week 
                </div>
            }  
        </>
    )
}

export default KsiegowoscTitleOne
