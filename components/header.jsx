import React from 'react'
import styles from '../styles/Header.module.scss'
import { Link } from '@material-ui/core'


const Header = () => {
    return (
        <div className={styles.header}>
            <div className={styles.logo}>
                <Link href="/"><a>LO/GO</a></Link>
            </div>
            <div className={styles.button}>
                KUP TERAZ
            </div>
        </div>
    )
}

export default Header
