import React from 'react'
import styles from '../../styles/Home.module.scss'
import { useSelector } from 'react-redux'


const MiddleBlock = () => {

    const language = useSelector(state=>state.language)

    return (
        <div className={styles.wfirmaText}>
            {language === 'pl' && 
                <h4>
                    Korzystając z usług wirtualnego biura otrzymujesz 
                    <span className={styles.bold}> Pakiet roczny <a href="/wfirma.pl" target="_blank">wFirma.pl</a> na rok całkowite za&nbsp;darmo! </span>
                </h4>            
            }
            {language === 'ua' && 
                <h4>
                    Користуючись послугами віртуального офісу, ви отримуєте   
                    <span className={styles.bold}> пакет компанії <a href="/wfirma.pl" target="_blank">wFirma.pl</a> безкоштовно на цілий рік!</span>
                </h4>            
            }
        </div>
    )
}

export default MiddleBlock
