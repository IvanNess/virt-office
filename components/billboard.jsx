import React from 'react'

import styles from '../styles/Billboard.module.scss'

const Billboard = ({children, noBackground=false, parentModule=false}) => {

    return (
        <>
            {parentModule!=='onas' && <div className={noBackground? styles.noBackground: styles.billboard}>
                <div className={noBackground? styles.noBackground: 
                    parentModule? styles[`${parentModule}BillboardWrapper`]: styles.billboardWrapper}>
                </div>
                <div style={{margin: 'auto', maxWidth: '1440px'}}>
                    {children}
                </div>
            </div>}
            {parentModule==='onas' && <div className={styles.onasBillboard}>
                <div className={styles.onasBillboardWrapper}></div>
                <div style={{margin: 'auto', maxWidth: '1440px'}}>
                    {children}
                </div>
            </div>
            
            }
        </>
    )
}

export default Billboard
