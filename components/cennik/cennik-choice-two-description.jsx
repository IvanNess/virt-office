import React from 'react'
import styles from '../../styles/CennikChoices.module.scss'
import { useSelector } from 'react-redux'


const CennikChoiceTwoDescription = () => {

    const language = useSelector(state=>state.language)

    return (
        <div className={styles.description}>
            {language === 'pl' && 
                <p>
                    - adres na potrzeby rejestracji i prowadzenia firmy 
                    <br/>
                    - powiadomienie o korespondencji
                    <br/>
                    - skanowanie i przesyłanie e-mailem korespondencji przychodzącej do 100 dokumentów lub 500 MB miesięcznie 
                    <br/>
                    - archiwizacja dokumentów w zabezpieczonym pomieszczeniu do 2 segregatorów na jeden rok 
                    <br/>
                    - wysyłanie korespondencji na wskazany adres 1 raz w tygodniu 
                    <br/>
                    - dostęp do sali konferencyjnej przez 5 godzin miesięcznie 
                    <br/>
                    - Pakiet Księgowość online + Asystent Księgowy z serwisu wfirma.pl 
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
                    - сканування поштової кореспонденці та надсилання її електронною поштою до  100 документів документів або 500 МБ на місяць
                    <br/>
                    - архівування документів у захищеному приміщенні до 2-х підшивок протягом одного року
                    <br/>
                    - надсилання кореспонденції на вказаний адреса раз на тиждень
                    <br/>
                    - доступ до конференц-залу 5 годин на місяць
                    <br/>
                    - Інтернет-пакет бухгалтерського обліку + Помічник з бухгалтерії від wfirma.pl
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
                    - scanning and e-mailing of incoming correspondence up to 100 documents or 500 MB per month
                    <br/>
                    - archiving of documents in a safeguarded room – up to two binders per year
                    <br/>
                    - sending of correspondence to the specified address once a week
                    <br/>
                    - access to the conference room for 5 hours a month
                    <br/>
                    - Online Accounting + Accounting Expert package from wfirma.pl
                    <br/>
                    <br/>
                    The price does not include VAT                
                </p>
            } 
      
        </div>  
    )
}

export default CennikChoiceTwoDescription
