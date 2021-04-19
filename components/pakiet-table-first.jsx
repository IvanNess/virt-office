import React from 'react'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown'
import CloseIcon from '@material-ui/icons/Close'

import styles from '../styles/PakietTable.module.scss'

function PakietTableFirst() {

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
                <div className={styles.names}>
                    <div className={styles.name}>Adres do rejestracji i korespondencyjny firmy</div>
                    <div className={styles.name}>Odbiór korespondencji zwykłej i przesyłek</div>
                    <div className={styles.name}>Odbiór korespondencji poleconej</div>
                    <div className={styles.name}>Powiadomienie o otrzymanych przesyłkach drogą mailową</div>
                    <div className={styles.name}>Skanowanie korespondencji</div>
                    <div className={styles.name}>Maksymalna liczba skanowanych stron w miesiącu</div>
                    <div className={styles.name}>Dedykowany nr telefonu z przekierowaniem na inny tel.</div>
                    {/* <div className={styles.nameWMargin}>płatność za 6 miesięcy z góry</div>
                    <div className={styles.nameWMargin}>płatność za 12 miesięcy z góry</div> */}
                </div>

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
                        <div className={styles.signWrapper}><CloseIcon style={{fontSize: '20px', color: '#CD0000'}}/></div>
                    </div>
                    <div className={styles.row}>
                        <div className={styles.signWrapper}><CloseIcon style={{fontSize: '20px', color: '#CD0000'}}/></div>
                    </div>
                    <div className={styles.row}>
                        <div className={styles.lastSignWrapper}><CloseIcon style={{fontSize: '20px', color: '#CD0000'}}/></div>
                    </div>
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
