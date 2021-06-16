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
                    <span className={styles.smallTextBold}>{` SPRAWDŹ DOSTĘPNE TERMINY I ZAREZERWUJ`}</span>.
                    Sala konferencyjna do wynajęcia mieści się na {` `}
                    <a className={styles.calendarLink} href={`https://www.google.com/maps/place/Zawodzie+20,+80-726+Gda%C5%84sk`} target='_blank'>
                        <span className={styles.smallTextBold}>ul.&nbsp;ZAWODZIE&nbsp;20&nbsp;w&nbsp;GDAŃSKU</span>
                    </a>
                    {` `}
                    - wkrótce udostępnimy <span className={styles.smallTextBold}>NOWE LOKALIZACJE</span>
                </>
            }
            {language === 'ua' && 
                <>
                    Погодинна оренда конференц-залу - чудове доповнення до винайму віртуальної адреси. Часто виникає потреба у зустрічі з діловими партнерами в умовах, зручних для співбесід або презентацій. 
                    <span className={styles.smallTextBold}>{` ПЕРЕВІРИТИ ВІЛЬНІ ДАТИ  ТА ЗАБРОНЮВАТИ`}</span>
                </>
            }
            {language === 'en' && 
                <>
                    The lease of a conference room by the hour perfectly supplements the lease of a virtual address. Sometimes you may have to meet business partners in comfortable conditions for holding negotiations or a presentation. 
                    <span className={styles.smallTextBold}>{` CHECK AVAILABLE DATES AND BOOK`}</span>
                </>
            }
        </div>
    )
}

export default CalendarDescription
