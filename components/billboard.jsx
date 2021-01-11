import React from 'react'

import styles from '../styles/Billboard.module.scss'

const Billboard = ({children}) => {
    return (
        <div className={styles.billboard}>
            <div className={styles.billboardWrapper}></div>
            {children}
        </div>
    )
}

export default Billboard
