import React from 'react'
import styles from '../../styles/Pakiet.module.scss'

import ProfileBoilerplate from '../../components/profile-boilerplate'
import KontoPackages from '../../components/konto-packages'

function Pakiet({auth, db}) {
    return (
        <div className={styles.pakiet}>
            <ProfileBoilerplate  auth={auth} db={db}>
                <div className={styles.title}>3. <span className={styles.bold}>Pakiet</span></div>
                <div className={styles.text}>
                    <div className={styles.small}>Wpisz nazwę lub kod pocztowy miasta, w którym chcesz wybrać adres firmy. Dostępne adresy i miesięczny koszt wyświetlą się poniżej.</div>
                </div>
                <KontoPackages/>
            </ProfileBoilerplate>       
        </div>
    )
}

export default Pakiet
