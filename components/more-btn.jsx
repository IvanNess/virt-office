import React from 'react'
import styles from '../styles/MoreBtn.module.scss'

const MoreBtn = ({show}) => {
    return (
        <div className= {show? styles.moreBtnShow: styles.moreBtnNone}>
            <p>
                Zobacz więcej
            </p>
        </div>
    )
}

export default MoreBtn
