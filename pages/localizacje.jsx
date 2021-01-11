import React from 'react'

import styles from '../styles/Localizacje.module.scss'
import Sidebar from '../components/side-bar'
import Billboard from '../components/billboard'
import Header from '../components/header'
import Map from '../components/map'
import {regions} from '../accessories/regions'

const Region = ({region})=>(
    <div className={styles.region} key={region.title}>
        <div className={styles.name}>{region.title}</div>
        <div className={styles.street}>{region.street}</div>
        <br/>
    </div>
)

function Localizacje() {
    return (
        <div className={styles.localizacje}>
            <Sidebar/>

            <Billboard>
                <Header/>
                <div className={styles.headerTitle}>
                    zobacz <span className={styles.headerBoldFont}>Lokalizacje naszych usług </span>
                    i wybierz najkorzystniejszą dla ciebie
                </div>
                <div className={styles.headerText}>
                    Zarządzaj swoim biznesem z każdego miejsca o dowolnej porze
                </div>
                <form className={styles.headerForm}>
                    <input className={styles.buttonInput} type="button" value="Wynajmij biuro"/>
                </form>
            </Billboard>   

            <div className={styles.title}>
                Nasze biura znajdują sie<br/> w <span className={styles.boldFont}>każdym województwie</span>
            </div>  

            <Map/>

            <div className={styles.regions}>
                <div className={styles.left}>
                    {regions.slice(0, 8).map(region=><Region region={region}/>)}
                </div>
                <div className={styles.right}>
                    {regions.slice(8).map(region=><Region region={region}/>)}
                </div>
            </div>
                   
        </div>
    )
}

export default Localizacje
