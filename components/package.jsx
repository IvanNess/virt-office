import React, { useState } from 'react'
import styles from '../styles/Packages.module.scss'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import ExpandLessIcon from '@material-ui/icons/ExpandLess'
import { useRouter } from 'next/router'
import Link from 'next/link'

const Package = ({title, text, id, openedId, setOpenedId, children}) => {

    const router = useRouter()
    const isKontoPakiet = router.pathname==="/konto/pakiet"

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
        <div className={isOpen? styles.open: styles.package} >
            <div className={styles.textWrapper}>
                <div className={styles[isKontoPakiet? "kontoPakietTitle": "title"]} onClick={clicked}>{title}</div>
                <div className={styles.text}>{text}</div>
                {children}
            </div>
            {isOpen && !isKontoPakiet && <div className={styles.buttonWrapper}>
                {/* <button className={styles.button} onClick={buynow}>Kup teraz</button> */}
                <Link href="/wynajecie"><a>Kup Teraz</a></Link>
            </div>}
            <div className={styles.arrowWrapper}>
                {!isOpen && <ExpandMoreIcon style={{color: '#E2C700', fontSize: '40px'}}/>}
                {isOpen && <ExpandLessIcon style={{color: '#E2C700', fontSize: '40px'}}/>}
            </div>
        </div>
    )
}

export default Package
