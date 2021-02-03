import React from 'react'
import styles from '../styles/Header.module.scss'
import Link from 'next/link'


const ProfileHeader = () => {
    return (
        <div className={styles.profileHeader}>
            <div className={styles.logo}>
                <Link href="/"><a>LO/GO</a></Link>
            </div>
            <div className={styles.button}>
                <Link href="/wynajecie"><a>KUP TERAZ</a></Link>
            </div>
        </div>
    )
}

export default ProfileHeader
