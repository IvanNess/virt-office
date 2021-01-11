import React, { useState } from 'react'
import styles from '../styles/Packages.module.scss'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import ExpandLessIcon from '@material-ui/icons/ExpandLess'

const Package = ({title, text, id, openedId, setOpenedId}) => {

    const isOpen = openedId===id

    function clicked(){
        if(id===openedId){
            setOpenedId(null)
        } else{
            setOpenedId(id)
        }
    }

    function buynow(e){
        e.stopPropagation();
    }

    return ( 
        <div className={isOpen? styles.open: styles.package} onClick={clicked}>
            <div className={styles.textWrapper}>
                <div className={styles.title}>{title}</div>
                <div className={styles.smallText}>{text}</div>
            </div>
            {isOpen && <div className={styles.buttonWrapper}>
                <button className={styles.button} onClick={buynow}>Kup teraz</button>
            </div>}
            <div className={styles.arrowWrapper}>
                {!isOpen && <ExpandMoreIcon style={{color: '#CD0000', fontSize: '40px'}}/>}
                {isOpen && <ExpandLessIcon style={{color: '#CD0000', fontSize: '40px'}}/>}
            </div>
        </div>
    )
}

export default Package
