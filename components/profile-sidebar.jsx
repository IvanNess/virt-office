import {useRouter} from 'next/router'
import styles from '../styles/ProfileSidebar.module.scss'
import { Link } from '@material-ui/core'

function ProfileSidebar() {

    const router = useRouter()
    console.log('router', router, router.pathname==="/konto/profil")

    return (
        <div className={styles.profileSidebar}>
            <div className={styles.categories}>
                <div className={router.pathname==="/konto/profil"? styles.active: ""}><Link href="/konto/profil"><a>1. Mój profil</a></Link></div>
                <div className={router.pathname==="/konto/dane"? styles.active: ""}><Link href="/konto/dane"><a>2. Moje dane</a></Link></div>
                <div className={router.pathname==="/konto/pakiet"? styles.active: ""}><Link href="/konto/pakiet"><a>3. Pakiet</a></Link></div>
                <div><Link href="/konto/profil"><a>4. Rozliczenia</a></Link></div>
                <div><Link href="/konto/profil"><a>&nbsp;&nbsp;&nbsp; — Historia</a></Link></div>
                <div><Link href="/konto/profil"><a>&nbsp;&nbsp;&nbsp; — Płatności</a></Link></div>
                <div><Link href="/konto/profil"><a>&nbsp;&nbsp;&nbsp; — Faktury</a></Link></div>
                <div className={router.pathname==="/konto/rezerwacja"? styles.active: ""}><Link href="/konto/rezerwacja"><a>5. Rezerwacja biura</a></Link></div>
            </div>
            <input className={styles.buttonInput} type="button" value="WYLOGUJ"/>
        </div>
    )
}

export default ProfileSidebar
