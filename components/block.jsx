import React, { useState } from 'react'
import styles from '../styles/Block.module.scss'
import MoreBtn from './more-btn'

function Block({className, showButton=true, children}) {

    const [show, setShow] = useState(false)

    function mouseEnter(){setShow(true)}

    function mouseLeave(){setShow(false)}

    if(!showButton){
        return(
            <div className={styles.fullBlock}>
                <div className={styles[`${className}None`]}>
                    {children}
                </div>
            </div>
        )
    }

    return (
        <div className={styles.fullBlock} onMouseEnter={mouseEnter} onMouseLeave={mouseLeave}>
            <div className={show? styles[className]: styles[`${className}None`]}>
                {children}
            </div>
            <MoreBtn show={show}/>
        </div>
    )
}

export default Block
