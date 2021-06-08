import React from 'react'
import styles from '../../styles/Home.module.scss'
import { useSelector } from 'react-redux'


const CalendarDescription = () => {

    const language = useSelector(state=>state.language)

    return (
        <div className={styles.smallText}>
            {language === 'pl' && 
                <>
                    wynajem sali konferencyjnej na godziny jest świetnym uzupełnieniem wynajmu wirtualnego adresu. Czasami powstaje potrzeba spotkania się z partnerami biznesowymi w warunkach komfortowych do przeprowadzenia rozmów lub prezentacji. 
                    <span className={styles.smallTextBold}>{` SPRAWDŹ DOSTĘPNE TERMINY I ZAREZERWUJ`}</span>
                </>
            }
            {language === 'ua' && 
                <>
                    Погодинна оренда конференц-залу - чудове доповнення до винайму віртуальної адреси. Часто виникає потреба у зустрічі з діловими партнерами в умовах, зручних для співбесід або презентацій. 
                    <span className={styles.smallTextBold}>{` ПЕРЕВІРИТИ ВІЛЬНІ ДАТИ  ТА ЗАБРОНЮВАТИ`}</span>
                </>
            }
        </div>
    )
}

export default CalendarDescription
