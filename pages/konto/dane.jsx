import React from 'react'
import styles from '../../styles/Dane.module.scss'

import ProfileBoilerplate from '../../components/profile-boilerplate'

function Dane({auth, db}) {
    return (
        <div className={styles.dane}>
            <ProfileBoilerplate  auth={auth} db={db}>
                <div>
                    <div className={styles.title}>2. <span className={styles.bold}>Moje dane</span></div>
                    <div className={styles.text}>
                        <div className={styles.small}>Wpisz nazwę lub kod pocztowy miasta, w którym chcesz wybrać adres firmy. Dostępne adresy i miesięczny koszt wyświetlą się poniżej.</div>
                    </div>
                    <form action="">
                        <input className={styles.login} type="text" placeholder="Login" value="" disabled={false}/>
                        <input className={styles.adress} type="text" placeholder="Adres email" value="" disabled={false}/>
                        <input className={styles.firm} type="text" placeholder="Nazwa Firmy" value="" disabled={false}/>
                        <input className={styles.name} type="text" placeholder="Imię i Nazwisko" value="" disabled={false}/>
                        <div className={styles.twoColumns}>
                            <input className={styles.login} type="text" placeholder="Login" value="" disabled={false}/>
                            <input className={styles.adress} type="text" placeholder="Adres email" value="" disabled={false}/>
                        </div>
                        <input className={styles.firm} type="text" placeholder="Nazwa Firmy" value="" disabled={false}/>
                        <div className={styles.twoColumns}>
                            <input className={styles.login} type="text" placeholder="NIP" value="" disabled={false}/>
                            <input className={styles.adress} type="text" placeholder="Adres email do korespondencji" value="" disabled={false}/>
                        </div>
                        <input className={styles.buttonInput} type="button" value="ZAPISZ"/>
                    </form>
                </div>
            </ProfileBoilerplate>       
        </div>
    )
}

export default Dane
