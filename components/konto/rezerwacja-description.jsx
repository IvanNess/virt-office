import React from 'react'
import styles from '../../styles/Home.module.scss'
import { useSelector } from 'react-redux'

const ReservationDescription = () => {

    const language = useSelector(state=>state.language)

    return (
        <>
            {language === 'pl' && 
                <>
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
                    Sala konferencyjna do wynajęcia mieści się na {` `}
                    <a className={styles.calendarLink} href={`https://www.google.com/maps/place/Zawodzie+20,+80-726+Gda%C5%84sk`} target='_blank'>
                        <span className={styles.smallTextBold}>ul.&nbsp;ZAWODZIE&nbsp;20&nbsp;w&nbsp;GDAŃSKU</span>
                    </a>
                    {` `}
                    - wkrótce udostępnimy <span className={styles.smallTextBold}>NOWE LOKALIZACJE</span>
                </>
            }
            {language === 'en' && 
                <>
                    Sala konferencyjna do wynajęcia mieści się na {` `}
                    <a className={styles.calendarLink} href={`https://www.google.com/maps/place/Zawodzie+20,+80-726+Gda%C5%84sk`} target='_blank'>
                        <span className={styles.smallTextBold}>ul.&nbsp;ZAWODZIE&nbsp;20&nbsp;w&nbsp;GDAŃSKU</span>
                    </a>
                    {` `}
                    - wkrótce udostępnimy <span className={styles.smallTextBold}>NOWE LOKALIZACJE</span>
                </>
            }
        </>
    )
}

export default ReservationDescription
