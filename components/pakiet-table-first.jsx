import React from 'react'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown'
import CloseIcon from '@material-ui/icons/Close'

import styles from '../styles/PakietTable.module.scss'
import { useSelector } from 'react-redux'

function PakietTableFirst() {

    const language = useSelector(state=>state.language)

    return (
        <div className={styles.cennikTable}>
            <div className={styles.titles}>
                {/* <div className={styles.title}>Pakiet2</div> */}
            </div>

            <div className={styles.spaces}>
                <div className={styles.left}></div>
                <div className={styles.right}>
                    <div className={styles.space}></div>
                </div>
            </div>

            <div className={styles.main}>
                {language==='pl' && <div className={styles.names}>
                    <div className={styles.name}><div>Adres na potrzeby rejestracji i prowadzenia firmy</div></div>
                    <div className={styles.name}><div>Powiadomienie o korespondencji <a href='https://wfirma.pl' target='_blank'>wfirma.pl</a></div></div>
                    <div className={styles.name}><div>Skanowanie i przesyłanie e-mailem korespondencji przychodzącej do 20 dokumentów lub 100 MB miesięcznie</div></div>
                    <div className={styles.name}><div>Archiwizacja dokumentów w zabezpieczonym pomieszczeniu - jeden segregator a4 na jeden rok</div></div>
                    <div className={styles.name}><div>Dostęp do sali konferencyjnej przez 2 godziny miesięcznie</div></div>
                    <div className={styles.name}><div>Pakiet Fakturowanie + Magazyn z serwisu <a href='https://wfirma.pl' target='_blank'>wfirma.pl</a> w pierwszym roku korzystania z virtoffice.pl</div></div>

                    {/* <div className={styles.nameWMargin}>płatność za 6 miesięcy z góry</div>
                    <div className={styles.nameWMargin}>płatność za 12 miesięcy z góry</div> */}
                </div>}
                {language==='ua' && <div className={styles.names}>
                    <div className={styles.name}><div>Адреса для реєстрації та ведення бізнесу</div></div>
                    <div className={styles.name}><div>Повідомлення про поштову кореспонденцію від <a href='https://wfirma.pl' target='_blank'>wfirma.pl</a></div></div>
                    <div className={styles.name}><div>Сканування вхідної кореспонденції до 20 документів або 100 МБ на місяць</div></div>
                    <div className={styles.name}><div>Архівування документів у забезпеченому приміщенні - одна підшивка А4 на один рік</div></div>
                    <div className={styles.name}><div>Доступ до конференц-залу протягом 2 годин на місяць</div></div>
                    <div className={styles.name}><div>Виставлення рахунків + Пакет складу від <a href='https://wfirma.pl' target='_blank'>wfirma.pl</a> у перший рік використання virtoffice.pl</div></div>
                </div>}


                <div className={styles.signs}>
                    <div className={styles.row}>
                        <div className={styles.signWrapper}><KeyboardArrowDownIcon style={{fontSize: '30px', color: '#3FBC22'}}/></div>
                    </div>
                    <div className={styles.row}>
                        <div className={styles.signWrapper}><KeyboardArrowDownIcon style={{fontSize: '30px', color: '#3FBC22'}}/></div>
                    </div>
                    <div className={styles.row}>
                        <div className={styles.signWrapper}><KeyboardArrowDownIcon style={{fontSize: '30px', color: '#3FBC22'}}/></div>
                    </div>
                    <div className={styles.row}>
                        <div className={styles.signWrapper}><KeyboardArrowDownIcon style={{fontSize: '30px', color: '#3FBC22'}}/></div>
                    </div>
                    <div className={styles.row}>
                        <div className={styles.signWrapper}><KeyboardArrowDownIcon style={{fontSize: '30px', color: '#3FBC22'}}/></div>
                    </div>
                    <div className={styles.row}>
                        <div className={styles.lastSignWrapper}><KeyboardArrowDownIcon style={{fontSize: '30px', color: '#3FBC22'}}/></div>
                    </div>
                    {/* <div className={styles.row}>
                        <div className={styles.lastSignWrapper}><CloseIcon style={{fontSize: '20px', color: '#CD0000'}}/></div>
                    </div> */}
                    {/* <div className={styles.row}>
                        <div className={styles.signWrapperWOBorder}>40zł/m-c</div>
                        <div className={styles.signWrapperWOBorder}>60zł/m-c</div>
                        <div className={styles.signWrapperWOBorder}>70zł/m-c</div>
                        <div className={styles.signWrapperWOBorder}>80zł/m-c</div>
                    </div>
                    <div className={styles.row}>
                        <div className={styles.signWrapperWOBorder}>40zł/m-c</div>
                        <div className={styles.signWrapperWOBorder}>60zł/m-c</div>
                        <div className={styles.signWrapperWOBorder}>70zł/m-c</div>
                        <div className={styles.signWrapperWOBorder}>80zł/m-c</div>
                    </div> */}
                </div>
            </div>
        </div>
    )
}

export default PakietTableFirst
