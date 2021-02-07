import React, { useState } from 'react'
import Package from './package'
import styles from '../styles/Packages.module.scss'
import { Collapse } from 'antd';
import Link from 'next/link';
const { Panel } = Collapse;


const Packages = () => {

    const [openedId, setOpenedId] = useState(null)

    return (
        <div className={styles.packages}>
            {/* <Package 
                id={1}
                openedId={openedId}
                setOpenedId={setOpenedId}
                title='Profesjonalny' 
                text='Profesjonalny adres z obsługą poczty i odbieraniem połączeń telefonicznych oraz dostęp bez rezerwacji do naszej globalnej sieci salonów biznesowych'
            />
            <Package 
                id={2}
                openedId={openedId}
                setOpenedId={setOpenedId}
                title='Biuro wirtualne' 
                text='Profesjonalny adres z obsługą poczty i odbieraniem połączeń telefonicznych oraz dostęp bez rezerwacji do naszej globalnej sieci salonów biznesowych'
            />        
            <Package 
                id={3}
                openedId={openedId}
                setOpenedId={setOpenedId}
                title='Pakiet biura wirtualnego plus' 
                text='Profesjonalny adres z obsługą poczty i odbieraniem połączeń telefonicznych oraz dostęp bez rezerwacji do naszej globalnej sieci salonów biznesowych'
            /> */}
            <Collapse accordion>
                <Panel header="Profesjonalny" key="1">
                    <div className={styles.link}><Link href="/wynajecie"><a>Kup Teraz</a></Link></div>
                    <p>Profesjonalny adres z obsługą poczty i odbieraniem połączeń telefonicznych oraz dostęp bez rezerwacji do naszej globalnej sieci salonów biznesowych</p>
                </Panel>
                <Panel header="Biuro wirtualne" key="2">
                    <div className={styles.link}><Link href="/wynajecie"><a>Kup Teraz</a></Link></div>
                    <p>Profesjonalny adres z obsługą poczty i odbieraniem połączeń telefonicznych oraz dostęp bez rezerwacji do naszej globalnej sieci salonów biznesowych</p>
                </Panel>
                <Panel header="Pakiet biura wirtualnego plus" key="3">
                    <div className={styles.link}><Link href="/wynajecie"><a>Kup Teraz</a></Link></div>
                    <p>Profesjonalny adres z obsługą poczty i odbieraniem połączeń telefonicznych oraz dostęp bez rezerwacji do naszej globalnej sieci salonów biznesowych</p>
                </Panel>
            </Collapse>
        </div>
    )
}

export default Packages
