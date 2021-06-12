import React from 'react'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown'
import CloseIcon from '@material-ui/icons/Close'

import styles from '../styles/PakietTable.module.scss'
import { useSelector } from 'react-redux'

function PakietTableThird() {

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
                    <div className={styles.name}><div>Wystawianie i wysyłanie drogą elektroniczną do 50 faktur miesięcznie w serwisie <a href='wfirma.pl'>wfirma.pl</a></div></div>
                    <div className={styles.name}><div>Powiadomienie o korespondencji</div></div>
                    <div className={styles.name}><div>Nielimitowana liczba skanowanych i przesyłanych e-mailem dokumentów</div></div>
                    <div className={styles.name}><div>Udostępnienie zarchiwizowanych dokumentów w chmurze do 2GB</div></div>
                    <div className={styles.name}><div>Archiwizacja dokumentów w zabezpieczonym pomieszczeniu pięć segregatorów na jeden rok</div></div>
                    <div className={styles.name}><div>Wysyłanie korespondencji na wskazany adres 1 raz w tygodniu</div></div>
                    <div className={styles.name}><div>Dostęp do sali konferencyjnej przez 10 godzin miesięcznie</div></div>
                    <div className={styles.name}><div>Pakiet Biuro rachunkowe z serwisu <a href='wfirma.pl'>wfirma.pl</a></div></div>

                    {/* <div className={styles.nameWMargin}>płatność za 6 miesięcy z góry</div>
                    <div className={styles.nameWMargin}>płatność za 12 miesięcy z góry</div> */}
                </div>}
                {language==='ua' && <div className={styles.names}>
                    <div className={styles.name}><div>Адреса для реєстрації та ведення бізнесу</div></div>
                    <div className={styles.name}><div>Випуск та надсилання в електронному вигляді до 50 рахунків-фактур на місяць на <a href='wfirma.pl'>wfirma.pl</a></div></div>
                    <div className={styles.name}><div>Повідомлення про вхідну поштову кореспонденцію</div></div>
                    <div className={styles.name}><div>Необмежена кількість сканованих та електронних листів документів</div></div>
                    <div className={styles.name}><div>Надання архівованих документів у хмарі до 2 Гб</div></div>
                    <div className={styles.name}><div>Архівування документів у забезпеченому приміщенні п'ятьма папками на один рік</div></div>
                    <div className={styles.name}><div>Відправлення кореспонденції на вказану адресу раз на тиждень</div></div>
                    <div className={styles.name}><div>Доступ до конференц-залу протягом 10 годин на місяць</div></div>
                    <div className={styles.name}><div>Пакет для бухгалтерії від <a href='wfirma.pl'>wfirma.pl</a></div></div>
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

export default PakietTableThird
