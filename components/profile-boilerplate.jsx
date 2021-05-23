import React, { useEffect } from 'react'
import ProfileHeader from '../components/profileHeader'
import SideBar from '../components/side-bar'
import ProfileSidebar from '../components/profile-sidebar'
import styles from '../styles/ProfileBoilerplate.module.scss'
import Line from './line'

function ProfileBoilerplate({children, db, auth}) {

    useEffect(()=>{
        console.log('profile boilerplate auth', auth)
    }, [auth])

    return (
        <div className={styles.ProfileBoilerplate}>
            <ProfileHeader/>
            <Line leftColor='#4CAED5' rightColor='#4CAED5' lineHeight='2px' top='148px'/>
            <div style={{backgroundImage: 'linear-gradient(-90deg, #ffffff 50%, #4caed5 50%)'}}>
            {/* <div> */}
                <div style={{margin: 'auto', maxWidth: '1440px', backgroundColor:'#ffffff'}}>
                    <div className={styles.wrapper}>
                        <ProfileSidebar auth={auth} db={db}/>
                        <div className={styles.children}>
                            {children}
                        </div>
                        {/* <SideBar color="#E2C700"/> */}
                    </div>  
                </div>  
            </div>>        
        </div>
    )
}

export default ProfileBoilerplate
