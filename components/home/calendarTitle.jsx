import React from 'react'
import styles from '../../styles/Home.module.scss'
import { useSelector } from 'react-redux'


const CalendarTitle = () => {

    const language = useSelector(state=>state.language)

    return (
        <>
            {language === 'pl' && 
                <><span className={styles.boldFont}>WYNAJMIJ BIURO NA GODZINY</span></>
            }
            {language === 'ua' && 
                <><span className={styles.boldFont}>ПОГОДИННА ОРЕНДА КОНФЕРЕНЦ ЗАЛИ</span></>
            }
            {language === 'en' && 
                <><span className={styles.boldFont}>LEASE AN OFFICE BY THE HOUR</span></>
            }
        </>
    )
}

export default CalendarTitle
