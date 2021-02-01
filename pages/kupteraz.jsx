import React from 'react'
import styles from '../styles/KupTeraz.module.scss'
import { services, periods } from '../accessories/options'
import SelectOption from '../components/select-option'

function Kupteraz() {
    return (
        <div className={styles.kupteraz}>
            <SelectOption options={services} reducerProp="selectedServiceId">
                <div className={styles.servicesTitle}>1. WYBÓR USŁUGI
                    <span className={styles.boldFont}> BIURA WIRTUALNEGO</span>
                </div>
            </SelectOption>
            <SelectOption options={periods} reducerProp="selectedPeriodId">
                <div className={styles.periodsTitle}>3. WYBIERZ
                    <span className={styles.boldFont}> CZAS TRWANIA UMOWY</span>
                    <br/><br/>
                    <div className={styles.smallText}>
                        Wpisz nazwę lub kod pocztowy miasta, w którym chcesz wybrać adres firmy. Dostępne adresy i miesięczny koszt wyświetlą się poniżej.
                    </div>
                </div>
            </SelectOption>
        </div>
    )
}

export default Kupteraz
