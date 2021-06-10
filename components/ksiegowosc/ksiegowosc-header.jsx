import React from 'react'
import styles from '../../styles/Ksiegowosc.module.scss'
import { useSelector } from 'react-redux'
import Link from 'next/link'

const KsiegowoscHeader = () => {

    const language = useSelector(state=>state.language)

    return (
        <div className={styles.headerOne}>
            {language === 'pl' && 
                <>
                    <div className={styles.headerTitle}>
                        Siła połączonych ofert <br/>
                        Dla klientów wynajmujących adres od&nbsp;<Link href='/'><a>virtoffice.pl</a></Link> 
                        <div className={styles.headerBoldFont}>ROK DARMOWEGO DOSTĘPU DO&nbsp;SERWISU KSIĘGOWEGO <a href="https://wfirma.pl" target="_blank">WFIRMA.PL</a></div>
                    </div>
                    <div className={styles.headerText}>
                        Księgowość zarówno on-line jak i&nbsp;konwencjonalna. 
                        <br/>
                        Wystawiaj faktury, wyliczaj podatki i rozliczaj się z ZUS dzięki księgowości on&#8209;line albo zleć to <span className={styles.headerTextBoldFont}>profesjonalnym księgowym</span>. Chętnie pomożemy Ci wybrać rozwiązanie najlepiej dopasowane do Twoich potrzeb.  
                    </div>
                </>
            }
            {language === 'ua' && 
                <>
                    <div className={styles.headerTitle}>
                        Сила комбінованих пропозицій virtoffice.pl 
                        для клієнтів, які орендують адресу з&nbsp;<Link href='/'><a>virtoffice.pl</a></Link> 
                        <div className={styles.headerBoldFont}>РІК БЕЗКОШТОВНОГО ДОСТУПУ В&nbsp;ОБЛІКОВУ СИСТЕМУ <a href="https://wfirma.pl" target="_blank">WFIRMA.PL</a></div>
                    </div>
                    <div className={styles.headerText}>
                        Онлайн та звичайний облік.                        
                        <br/>
                        Виписуйте рахунки-фактури, обчислюйте податки та розраховуйтесь з ZUS завдяки бухгалтерському онлайн-обліку або передайте його у розпорядження 
                        <span className={styles.headerTextBoldFont}> ПРОФЕСІЙНОГО БУХГАЛТЕРА</span>. 
                        Ми будемо раді допомогти вам вибрати рішення, яке найкраще відповідає вашим потребам.
                    </div>
                </>
            }        
        </div>
    )
}

export default KsiegowoscHeader
