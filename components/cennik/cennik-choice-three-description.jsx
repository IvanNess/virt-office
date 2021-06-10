import React from 'react'
import styles from '../../styles/CennikChoices.module.scss'
import { useSelector } from 'react-redux'


const CennikChoiceThreeDescription = () => {

    const language = useSelector(state=>state.language)

    return (
        <div className={styles.description}>
            {language === 'pl' && 
                <p>
                    - adres na potrzeby rejestracji i prowadzenia firmy 
                    <br/>
                    - wystawianie i wysyłanie drogą elektroniczną do 50 faktur miesięcznie w serwisie wfirma.pl 
                    <br/>
                    - powiadomienie o korespondencji
                    <br/>
                    - nielimitowana liczba skanowanych i przesyłanych e-mailem dokumentów 
                    <br/>
                    - udostępnienie zarchiwizowanych dokumentów w chmurze do 2GB 
                    <br/>
                    - archiwizacja dokumentów w zabezpieczonym pomieszczeniu pięć segregatorów na jeden rok 
                    <br/>
                    - wysyłanie korespondencji na wskazany adres 1 raz w tygodniu 
                    <br/>
                    - dostęp do sali konferencyjnej przez 10 godzin miesięcznie 
                    <br/>
                    - Pakiet Biuro rachunkowe z serwisu wfirma.pl 
                    <br/>
                    <br/>
                    Cena nie zawiera podatku VAT
                </p>
            } 
            {language === 'ua' && 
                <p>
                    - адреса для реєстрації та управління компанією
                    <br/>
                    - формування  та надсилання електронною поштою до 50 рахунків-фактур на місяць на wfirma.pl
                    <br/>
                    - повідомлення про поштову кореспонденцію
                    <br/>
                    - необмежена кількість сканованих та електронних листів
                    <br/>
                    - зберігання архівованих документів у віртуальній хмарі до 2 Гб
                    <br/>
                    - архівування документів в захищеній кімнаті п’ять підшивок протягом одного року
                    <br/>
                    - надсилання кореспонденції на вказану адресу раз на тиждень
                    <br/>
                    - доступ до конференц-залу протягом 10 годин на місяць
                    <br/>
                    - Бухгалтерський  пакету з веб-сайту wfirma.pl
                    <br/>
                    <br/>
                    Ціна не включає ПДВ
                </p>
            } 
        </div>  
    )
}

export default CennikChoiceThreeDescription
