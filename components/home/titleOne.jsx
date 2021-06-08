import React from 'react'
import styles from '../../styles/Home.module.scss'
import { useSelector } from 'react-redux'


const TitleOne = () => {

    const language = useSelector(state=>state.language)

    return (
        <div className={styles.title}>
            {language === 'pl' && 
                <>dlaczego warto skorzystać z <span className={styles.boldFont}>VIRTOFFICE</span></>
            }
            {language === 'ua' && 
                <>Чому варто використовувати <span className={styles.boldFont}>Віртуальний Офіс</span></>
            }
        </div>
    )
}

export default TitleOne
