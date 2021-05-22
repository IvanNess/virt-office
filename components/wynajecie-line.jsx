import React from 'react'
import styles from '../styles/WynajecieLine.module.scss'

const WynajecieLine = () => {
    return (
        <div className={styles.wynajecieLineWrapper}>
            <div className={styles.wynajecieLine}>
                <div className={styles.left}></div>
                <div className={styles.middle}></div>
                <div className={styles.right}></div>
            </div>
        </div>
        
    )
}

export default WynajecieLine
