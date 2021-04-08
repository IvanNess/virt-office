import React, { useEffect } from 'react'
import styles from '../../styles/Rozliczenia.module.scss'

import ProfileBoilerplate from '../../components/profile-boilerplate'

import { Select } from 'antd';
import axios from 'axios';

const { Option } = Select;

function RozliczeniaFaktury({db, auth}) {

    function handleChange(){}

    return (
        <div className={styles.rozliczeniaFaktury}>
            <ProfileBoilerplate  auth={auth} db={db}>
                <div className={styles.title}>4. <span className={styles.bold}>Rozliczenia</span> / Faktury</div>
                <div className={styles.text}>
                    <div className={styles.small}>Wpisz nazwę lub kod pocztowy miasta, w którym chcesz wybrać adres firmy. Dostępne adresy i miesięczny koszt wyświetlą się poniżej.</div>
                </div>

                <div className={styles.table}>

                <div className="rozliczeniaSelect">
                    <Select defaultValue="Wszystkie" onChange={handleChange}>
                        <Option value="Wszystkie">Wszystkie</Option>
                        <Option value="Obecny miesiąc">Obecny miesiąc</Option>
                    </Select>
                </div>
               

                    <div className={styles.headerRow}>
                        <div className={styles.firstRow}>Nr faktury</div>
                        <div className={styles.secondRow}>Nazwa</div>
                        <div className={styles.thirdRow}>Data</div>
                        <div className={styles.fourthRow}>Wartość</div>
                    </div>
                    <div className={styles.row}>
                        <div className={styles.firstRow}>3/234/234</div>
                        <div className={styles.secondRow}>Lorem ipsum dolor sit amet, consetetur sadipscing.</div>
                        <div className={styles.thirdRow}>23/12/2020</div>
                        <div className={styles.fourthRow}>1 500 zł Brutto</div>
                    </div>
                </div>
            </ProfileBoilerplate>       
        </div>
    )
}

export default RozliczeniaFaktury
