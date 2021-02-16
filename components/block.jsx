import React, { useState } from 'react'
import styles from '../styles/Block.module.scss'
import MoreBtn from './more-btn'

function Block({className, showButton=true, children, showMore, mainColorBg=false}) {

    const [show, setShow] = useState(true)

    function mouseEnter(){setShow(true)}

    function mouseLeave(){setShow(true)}

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
            <MoreBtn show={showMore} mainColorBg={mainColorBg}/>
        </div>
    )
}

export default Block
