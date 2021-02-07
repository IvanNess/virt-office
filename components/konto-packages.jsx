import React, { useState } from 'react'
import Package from './package'
import styles from '../styles/KontoPackages.module.scss'
import PakietTableFirst from './pakiet-table-first'
import PackietButtons from './packietButtons'
import { Collapse } from 'antd';
import Link from 'next/link';
const { Panel } = Collapse;

const KontoPackages = () => {

    const [openedId, setOpenedId] = useState(null)

    return (
        <div className={styles.kontoPackages}>
            {/* <Package 
                id={1}
                openedId={openedId}
                setOpenedId={setOpenedId}
                title='Profesjonalny' 
                text='Profesjonalny adres z obsługą poczty i odbieraniem połączeń telefonicznych oraz dostęp bez rezerwacji do naszej globalnej sieci salonów biznesowych'
            >
                <PakietTableFirst/>
                <PackietButtons/>
            </Package>
            <Package 
                id={2}
                openedId={openedId}
                setOpenedId={setOpenedId}
                title='Biuro wirtualne' 
                text='Profesjonalny adres z obsługą poczty i odbieraniem połączeń telefonicznych oraz dostęp bez rezerwacji do naszej globalnej sieci salonów biznesowych'
                >
                <PakietTableFirst/>
                <PackietButtons/>
            </Package>       
            <Package 
                id={3}
                openedId={openedId}
                setOpenedId={setOpenedId}
                title='Pakiet biura wirtualnego plus' 
                text='Profesjonalny adres z obsługą poczty i odbieraniem połączeń telefonicznych oraz dostęp bez rezerwacji do naszej globalnej sieci salonów biznesowych'
                >
                <PakietTableFirst/>
                <PackietButtons/>
            </Package> */}
            <Collapse accordion>
                <Panel header="Profesjonalny" key="1">
                    <p>Profesjonalny adres z obsługą poczty i odbieraniem połączeń telefonicznych oraz dostęp bez rezerwacji do naszej globalnej sieci salonów biznesowych</p>
                    <PakietTableFirst/>
                    {/* <PackietButtons/> */}
                </Panel>
                <Panel header="Biuro wirtualne" key="2">
                    <p>Profesjonalny adres z obsługą poczty i odbieraniem połączeń telefonicznych oraz dostęp bez rezerwacji do naszej globalnej sieci salonów biznesowych</p>
                    <PakietTableFirst/>
                    {/* <PackietButtons/> */}
                </Panel>
                <Panel header="Pakiet biura wirtualnego plus" key="3">
                    <p>Profesjonalny adres z obsługą poczty i odbieraniem połączeń telefonicznych oraz dostęp bez rezerwacji do naszej globalnej sieci salonów biznesowych</p>
                    <PakietTableFirst/>
                    {/* <PackietButtons/> */}
                </Panel>
            </Collapse>
        </div>
    )
}

export default KontoPackages
