import React from 'react'
import styles from '../../styles/Ksiegowosc.module.scss'
import { useSelector } from 'react-redux'


const KsiegowoscTitleTwo = () => {

    const language = useSelector(state=>state.language)

    return (
        <>
            {language === 'pl' && 
                <div className={styles.secondTitle}>
                    <div className={styles.title}>
                        Nasz partner serwis księgowy <span className={styles.boldFont}><a href ='https://wfirma.pl'>wFirma.pl</a></span> w&nbsp;liczbach
                    </div>
                </div>
            }
             {language === 'ua' && 
                <div className={styles.secondTitle}>
                    <div className={styles.title}>
                        наш партнер, бухгалтерська служба <span className={styles.boldFont}><a href ='https://wfirma.pl'>wFirma.pl</a></span> у&nbsp;цифрах
                    </div>
                </div>
            }     
        </>
    )
}

export default KsiegowoscTitleTwo
