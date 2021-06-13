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
            {language === 'en' && 
                <p>
                    - address for registration and business operation purposes
                    <br/>
                    - notification of correspondence
                    <br/>
                    - scanning and e-mailing of incoming correspondence up to 20 documents or 100 MB per month
                    <br/>
                    - archiving of documents in a safeguarded room – one A4 binder per year
                    <br/>
                    - access to the conference room for 2 hours a month
                    <br/>
                    - Invoicing + Warehouse package from wfirma.pl in the first year of using virtoffice.pl
                    <br/>
                    <br/>
                    The price does not include VAT                
                </p>
            }  
        </div>  
    )
}

export default CennikChoiceOneDescription
