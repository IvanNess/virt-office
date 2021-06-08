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
        </div>
    )
}

export default MiddleText
