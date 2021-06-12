import {useRouter} from 'next/router'
import styles from '../styles/ProfileSidebar.module.scss'
import Link from 'next/link'

import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { logoutAction } from '../redux/actions'
import { LoadingOutlined } from '@ant-design/icons'
import { phrases, buttonNames } from '../accessories/constants'


function ProfileSidebar({auth, db}) {

    const router = useRouter()
    console.log('router', router, router.pathname==="/konto/profil")

    const dispatch = useDispatch()

    const [isButtonDisabled, setIsButtonDisabled] = useState(false)

    const currentUser = useSelector(state=>state.currentUser)
    const language = useSelector(state=>state.language)

    async function logout(){
        // setIsButtonDisabled(true)
        try {
            await auth.signOut()
            dispatch(logoutAction()) 
            router.push('/')
        } catch (error) {
            console.log(error)
        }
        // setIsButtonDisabled(false)
    }

    return (
        <div className={styles.profileSidebar}>
            <div className={styles.categories}>
                <div className={router.pathname==="/konto/profil"? styles.active: ""}><Link href="/konto/profil"><a>
                    {buttonNames[language]?.myProfile}
                </a></Link></div>
                {/* <div className={router.pathname==="/konto/dane"? styles.active: ""}><Link href="/konto/dane"><a>2. Moje dane</a></Link></div> */}
                <div className={router.pathname==="/konto/pakiet"? styles.active: ""}><Link href="/konto/pakiet"><a>
                    {buttonNames[language]?.pakiet}
                </a></Link></div>
                <div className={router.pathname==="/konto/rozliczenia"? styles.active: ""}><Link href="/konto/rozliczenia"><a>
                    {buttonNames[language]?.rozliczenia}
                </a></Link></div>
                {/* <div><Link href="/konto/profil"><a>&nbsp;&nbsp;&nbsp; — Historia</a></Link></div>
                <div><Link href="/konto/profil"><a>&nbsp;&nbsp;&nbsp; — Płatności</a></Link></div>
                <div><Link href="/konto/rozliczenia-faktury"><a>&nbsp;&nbsp;&nbsp; — Faktury</a></Link></div> */}
                <div className={router.pathname==="/konto/rezerwacja"? styles.active: ""}><Link href="/konto/rezerwacja"><a>
                    {buttonNames[language]?.rezerwacja}
                </a></Link></div>
                <div className={router.pathname==="/konto/moje-rezerwacje"? styles.active: ""}><Link href="/konto/moje-rezerwacje"><a>
                    &nbsp;&nbsp;&nbsp; {buttonNames[language]?.myReservations}
                </a></Link></div>
            </div>
            <div className={styles.buttonInputWrapper}>
                {currentUser && <input 
                    className={styles.buttonInput} type="button" 
                    value={buttonNames[language]?.logout} 
                    onClick={logout} disabled={!currentUser}
                />}
                {!currentUser && <LoadingOutlined style={{color: "black"}}/>}
            </div>
        </div>
    )
}

export default ProfileSidebar
