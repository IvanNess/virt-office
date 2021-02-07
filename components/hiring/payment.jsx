import React from 'react'
import styles from '../../styles/Payment.module.scss'

function Payment() {

    return (
        <div className={styles.payment}>
            <div className={styles.title}>
                5. wybierz <span className={styles.boldFont}>sposób płatności</span> 
            </div>
            <div className={styles.description}>
                Wpisz nazwę lub kod pocztowy miasta, w którym chcesz wybrać adres firmy. Dostępne adresy i miesięczny koszt wyświetlą się poniżej.
            </div>
            <div className={styles.underConstruction}>Under construction...</div>
        </div>
    )
}

export default Payment
