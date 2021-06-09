import React from 'react'
import styles from '../../styles/Home.module.scss'
import { useSelector } from 'react-redux'


const MiddleText = () => {

    const language = useSelector(state=>state.language)

    return (
        <div className={styles.middleText}>
            {language === 'pl' && 
                <p>          
                    W ramach usługi dajemy również dostęp do sali konferencyjnej, która na czas użytkowania będzie oznakowana logiem Twojej firmy. Sala wyposażona jest w stół konferencyjny, rzutnik z&nbsp;ekranem do wyświetlania prezentacji, drukarkę ze skanerem, aneks kuchenny do przygotowywania kawy lub herbaty oraz strefę chillout dającą komfort prowadzenia rozmów.
                </p>
            }
            {language === 'ua' && 
                <p>
                    В рамках послуги ми також надаємо доступ до конференц-залу, у яком протягом всього часу оренди на моніторах буде відображено логотип вашої компанії. Кімната обладнана конференц-столом, проектором з екраном для презентацій, принтером та сканером, кондиціонером, міні-кухнею для приготування кави та чаю для комфортних розмов.
                </p>
            }
            {language === 'en' && 
                <p>          
                    The scope of our service includes also access to a conference room, which will be marked with the logo of your company for the period of its use. The room is provided with a conference table, a projector with a screen for the display of presentations, a printer with a scanner, a kitchenette for the preparation of coffee or tea and a chillout zone ensuring the comfort of negotiations.                
                </p>
            }

        </div>
    )
}

export default MiddleText
