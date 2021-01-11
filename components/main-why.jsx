import React, { useState } from 'react'
import styles from '../styles/Block.module.scss'

function MainWhy({text}) {

    return (
        <div className={styles.why}>
            <div className={styles.mainWhyBlock}>
                {text}
            </div>
        </div>
        
    )
}

export default MainWhy
