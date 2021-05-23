import React from 'react'
import styles from '../styles/Line.module.scss'

const Line = ({top=149, leftColor='#ffffff', rightColor='#ffffff', lineHeight='1px'}) => {
    return (
        <div className={styles.lineWrapper} style={{top}}>
            <div className={styles.line}>
                <div className={styles.left} style={{borderBottom: `${lineHeight} solid ${leftColor}`}}></div>
                <div className={styles.middle}></div>
                <div className={styles.right} style={{borderBottom: `${lineHeight} solid ${rightColor}`}}></div>
            </div>
        </div>
        
    )
}

export default Line
