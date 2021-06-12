import React from 'react'
import styles from '../styles/Display.module.scss'
import { useSelector } from 'react-redux'


const DisplayDescription = () => {

    const language = useSelector(state=>state.language)

    return (
        <>
            {language === 'pl' && 
                <div className={styles.description}>
                    Tak będzie wyglądał ekran przed biurem oraz w samym biurze. 
                    <br/>
                    Aby zmienić, kliknij na obrazek i wybierz swój. 
                    <br/>
                    Zalecany rozmiar to 1200 na 800 pikseli.
                </div>
            }
            {language === 'ua' && 
                <div className={styles.description}>
                    Ось так буде виглядати екран перед офісом та у самому офісі.
                    <br/>
                    Щоб змінити, натисніть на картинку і виберіть свою.
                    <br/>
                    Рекомендований розмір - 1200 на 800 пікселів.
                </div>
            }      
        </>
    )
}

export default DisplayDescription
