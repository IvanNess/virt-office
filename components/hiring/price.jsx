import React from 'react'
import { useSelector } from 'react-redux'
import styles from '../../styles/Price.module.scss'

function Price() {

    const hiringChoices = useSelector(state=>state.hiringChoices)

    return (
        <div className={styles.price}>
            { 
                hiringChoices[0].isComplete && hiringChoices[2].isComplete &&
                <div className={styles.wrapper}>
                    <div className={styles.title}>Cena:&nbsp;</div>
                    <div className={styles.value}>1 500zl</div>
                </div>
            }
            {
                hiringChoices[0].isComplete && hiringChoices[2].isComplete &&
                hiringChoices[1].isComplete && hiringChoices[3].isComplete &&
                <button className={styles.priceButton}>ZAPŁAĆ</button>
            }
        </div>
    )
}

export default Price
