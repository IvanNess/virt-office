import React from 'react'
import styles from '../../styles/Home.module.scss'
import { useSelector } from 'react-redux'


const TitleThree = () => {

    const language = useSelector(state=>state.language)

    return (
        <div className={styles.titleThree}>
            {language === 'pl' && 
                <>CENA BEZ UKRYTYCH KOSZTÓW  — <span className={styles.boldFont}>załatw wszystkie formalności online</span></>
            }
            {language === 'ua' && 
                <>ціна без прихованих витрат — <span className={styles.boldFont}>виконай ВСІ ФОРМАЛЬНОСТІ В&nbsp;ІНТЕРНЕТІ</span></>
            }
        </div>
    )
}

export default TitleThree
