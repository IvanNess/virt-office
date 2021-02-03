import React, { useEffect } from 'react'
import ProfileHeader from '../components/profileHeader'
import SideBar from '../components/side-bar'
import ProfileSidebar from '../components/profile-sidebar'
import styles from '../styles/ProfileBoilerplate.module.scss'

function ProfileBoilerplate({children, db, auth}) {

    useEffect(()=>{
        console.log('profile boilerplate auth', auth)
    }, [auth])

    return (
        <div className={styles.ProfileBoilerplate}>
            <ProfileHeader/>
            <div className={styles.wrapper}>
                <ProfileSidebar auth={auth} db={db}/>
                <div className={styles.children}>
                    {children}
                </div>
                {/* <SideBar color="#E2C700"/> */}
                
            </div>
            
        </div>
    )
}

export default ProfileBoilerplate
