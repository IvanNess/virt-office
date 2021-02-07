import React from 'react'

import styles from '../styles/Billboard.module.scss'

const Billboard = ({children, noBackground=false, parentModule=false}) => {

    return (
        <div className={noBackground? styles.noBackground: styles.billboard}>
            <div className={noBackground? styles.noBackground: 
                parentModule? styles[`${parentModule}BillboardWrapper`]: styles.billboardWrapper}>
            </div>
            {children}
        </div>
    )
}

export default Billboard
