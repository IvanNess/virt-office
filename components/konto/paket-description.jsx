import React from 'react'
import styles from '../../styles/Home.module.scss'
import { useSelector } from 'react-redux'

const PakietDescription = () => {

    const language = useSelector(state=>state.language)

    return (
        <>
            {language === 'pl' && 
                <>
                    Aktualnie dostępny adres to {` `}
                    <a className={styles.calendarLink} href={`https://www.google.com/maps/place/Zawodzie+20,+80-726+Gda%C5%84sk`} target='_blank'>
                        <span className={styles.smallTextBold}>ul.&nbsp;ZAWODZIE&nbsp;20&nbsp;w&nbsp;GDAŃSKU</span>
                    </a>
                    <br/>
                    - wkrótce udostępnimy <span className={styles.smallTextBold}>ADRESY W INNYCH MIASTACH</span>
                </>
            }
            {language === 'ua' && 
                <>
                    Aktualnie dostępny adres to {` `}
                    <a className={styles.calendarLink} href={`https://www.google.com/maps/place/Zawodzie+20,+80-726+Gda%C5%84sk`} target='_blank'>
                        <span className={styles.smallTextBold}>ul.&nbsp;ZAWODZIE&nbsp;20&nbsp;w&nbsp;GDAŃSKU</span>
                    </a>
                    <br/>
                    - wkrótce udostępnimy <span className={styles.smallTextBold}>ADRESY W INNYCH MIASTACH</span>
                </>
            }
            {language === 'en' && 
                <>
                    Aktualnie dostępny adres to {` `}
                    <a className={styles.calendarLink} href={`https://www.google.com/maps/place/Zawodzie+20,+80-726+Gda%C5%84sk`} target='_blank'>
                        <span className={styles.smallTextBold}>ul.&nbsp;ZAWODZIE&nbsp;20&nbsp;w&nbsp;GDAŃSKU</span>
                    </a>
                    <br/>
                    - wkrótce udostępnimy <span className={styles.smallTextBold}>ADRESY W INNYCH MIASTACH</span>
                </>
            }
        </>
    )
}

export default PakietDescription
