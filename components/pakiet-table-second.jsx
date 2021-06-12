import React from 'react'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown'
import CloseIcon from '@material-ui/icons/Close'

import styles from '../styles/PakietTable.module.scss'
import { useSelector } from 'react-redux'

function PakietTableSecond() {

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
                    <div className={styles.name}><div>Powiadomienie o korespondencji</div></div>
                    <div className={styles.name}><div>Skanowanie i przesyłanie e-mailem korespondencji przychodzącej do 100 dokumentów lub 500 MB miesięcznie</div></div>
                    <div className={styles.name}><div>Archiwizacja dokumentów w zabezpieczonym pomieszczeniu do 2 segregatorów na jeden rok</div></div>
                    <div className={styles.name}><div>Wysyłanie korespondencji na wskazany adres 1 raz w tygodniu</div></div>
                    <div className={styles.name}><div>Dostęp do sali konferencyjnej przez 5 godzin miesięcznie</div></div>
                    <div className={styles.name}><div>Pakiet Księgowość online + Asystent Księgowy z serwisu <a href='https://wfirma.pl' target='_blank'>wfirma.pl</a></div></div>

                    {/* <div className={styles.nameWMargin}>płatność za 6 miesięcy z góry</div>
                    <div className={styles.nameWMargin}>płatność za 12 miesięcy z góry</div> */}
                </div>}
                {language==='ua' && <div className={styles.names}>
                    <div className={styles.name}><div>Адреса для реєстрації та управління компанією</div></div>
                    <div className={styles.name}><div>Повідомлення про поштову кореспонденці</div></div>
                    <div className={styles.name}><div>Сканування поштової кореспонденці та надсилання її електронною поштою до  100 документів документів або 500 МБ на місяць</div></div>
                    <div className={styles.name}><div>Архівування документів у захищеному приміщенні до 2-х підшивок протягом одного року</div></div>
                    <div className={styles.name}><div>Надсилання кореспонденції на вказаний адреса раз на тиждень</div></div>
                    <div className={styles.name}><div>Доступ до конференц-залу 5 годин на місяць</div></div>
                    <div className={styles.name}><div>Інтернет-пакет бухгалтерського обліку + Помічник з бухгалтерії від  <a href='https://wfirma.pl' target='_blank'>wfirma.pl</a></div></div>
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

export default PakietTableSecond
