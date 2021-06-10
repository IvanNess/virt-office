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
        </div>  
    )
}

export default CennikChoiceTwoDescription
