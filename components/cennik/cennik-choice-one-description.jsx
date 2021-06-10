import React from 'react'
import styles from '../../styles/CennikChoices.module.scss'
import { useSelector } from 'react-redux'


const CennikChoiceOneDescription = () => {

    const language = useSelector(state=>state.language)

    return (
        <div className={styles.description}>
            {language === 'pl' && 
                <p>
                    - adres na potrzeby rejestracji i prowadzenia firmy 
                    <br/>
                    - powiadomienie o korespondencji
                    <br/>
                    - skanowanie i przesyłanie e-mailem korespondencji przychodzącej do 20 dokumentów lub 100 MB miesięcznie 
                    <br/>
                    - archiwizacja dokumentów w zabezpieczonym pomieszczeniu - jeden segregator a4 na jeden rok
                    <br/>
                    - dostęp do sali konferencyjnej przez 2 godziny miesięcznie 
                    <br/>
                    - Pakiet Fakturowanie + Magazyn z serwisu wfirma.pl w pierwszym roku korzystania z virtoffice.pl
                    <br/>
                    <br/>
                    Cena nie zawiera podatku VAT
                </p>
            } 
            {language === 'ua' && 
                <p>
                    - адреса для реєстрації та управління компанією
                    <br/>
                    - повідомлення про поштову кореспонденці.
                    <br/>
                    - сканування поштової кореспонденці та надсилання її електронною поштою до 20 документів або 100 МБ на місяць
                    <br/>
                    - архівування документів у захищеному приміщенні - одна підшивка А4 протягом одного року
                    <br/>
                    - доступ до конференції кімнати 2 години на місяць
                    <br/>
                    - Пакет виставлення рахунків + Склад від wfirma.pl протягом першого року використання virtoffice.pl
                    <br/>
                    <br/>
                    Ціна не включає ПДВ
                </p>
            } 
        </div>  
    )
}

export default CennikChoiceOneDescription
