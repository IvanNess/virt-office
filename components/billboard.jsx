import React from 'react'

import styles from '../styles/Billboard.module.scss'

const Billboard = ({children, noBackground=false}) => {
    return (
        <div className={noBackground? styles.noBackground: styles.billboard}>
            <div className={noBackground? styles.noBackground: styles.billboardWrapper}></div>
            {children}
        </div>
    )
}

export default Billboard
