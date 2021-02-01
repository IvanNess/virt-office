import React, { useState } from 'react'
import Package from './package'
import styles from '../styles/KontoPackages.module.scss'
import PakietTableFirst from './pakiet-table-first'
import PackietButtons from './packietButtons'

const KontoPackages = () => {

    const [openedId, setOpenedId] = useState(null)

    return (
        <div className={styles.kontoPackages}>
            <Package 
                id={1}
                openedId={openedId}
                setOpenedId={setOpenedId}
                title='Profesjonalny' 
                text='Profesjonalny adres z obsługą poczty i odbieraniem połączeń telefonicznych oraz dostęp bez rezerwacji do naszej globalnej sieci salonów biznesowych'
            >
                <PakietTableFirst/>
                {/* <PackietButtons/> */}
            </Package>
            <Package 
                id={2}
                openedId={openedId}
                setOpenedId={setOpenedId}
                title='Biuro wirtualne' 
                text='Profesjonalny adres z obsługą poczty i odbieraniem połączeń telefonicznych oraz dostęp bez rezerwacji do naszej globalnej sieci salonów biznesowych'
                >
                <PakietTableFirst/>
                {/* <PackietButtons/> */}
            </Package>       
            <Package 
                id={3}
                openedId={openedId}
                setOpenedId={setOpenedId}
                title='Pakiet biura wirtualnego plus' 
                text='Profesjonalny adres z obsługą poczty i odbieraniem połączeń telefonicznych oraz dostęp bez rezerwacji do naszej globalnej sieci salonów biznesowych'
                >
                <PakietTableFirst/>
                {/* <PackietButtons/> */}
            </Package>
        </div>
    )
}

export default KontoPackages
