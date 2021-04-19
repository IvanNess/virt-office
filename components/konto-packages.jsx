import React, { useState, useEffect } from 'react'
import Package from './package'
import styles from '../styles/KontoPackages.module.scss'
import PakietTableFirst from './pakiet-table-first'
import PackietButtons from './packietButtons'
import { Collapse } from 'antd';
import Link from 'next/link';
import axios from 'axios'
import { setPackages } from '../redux/actions'
import { useSelector, useDispatch } from 'react-redux'
import moment from 'moment'
const { Panel } = Collapse;

const Header = ({isMain, packageName, endDate, updPrice=null})=>{
    const update = (e)=>{
        e.stopPropagation(); 
        console.log('update pakiet')
    }

    return(
    <div className={styles.header}>
        <div className={isMain? styles.mainPackageName : styles.packageName}>{packageName}</div>
        {isMain && <div className={styles.endDate}>{`kończy się ${endDate}`}</div>}
        {updPrice && <button className={styles.updateBtn} onClick={update}>{`aktualizacja (${updPrice}zł)`}</button>}
    </div>
)}

const KontoPackages = ({auth}) => {

    const midlePrice = 150
    const highPrice = 450

    const [updPriceToMiddlePakiet, setUpdPriceToMiddlePakiet] = useState(null)
    const [updPriceToHighPakiet, setUpdPriceToHighPakiet] = useState(null)

    const [packageName, setPackageName] = useState(null)
    const [endDate, setEndDate] = useState(null)

    const currentUser = useSelector(state=>state.currentUser)
    const packages = useSelector(state=>state.packages)

    const dispatch = useDispatch()

    useEffect(()=>{
        console.log('use effect pakiet', currentUser)
        if(currentUser && !packages){
            getUserPackages()
        }
    }, [currentUser, packages])

    useEffect(()=>{
        console.log('packages', packages)
        if(!packages)
            return
        const pakiet = packages[0]

        const packageName = pakiet.pakietName.includes('Wirtualny adres') ? "Wirtualny adres" :
            pakiet.pakietName.includes('Profesjonalne biuro') ? "Profesjonalne biuro" : "Optymalny pakiet"
        console.log('packageName', packageName)
        setPackageName(packageName)

        const days = pakiet.hiredPeriod === "Miesiąc" ? 31 :
            pakiet.hiredPeriod === "Kwartał" ? 93 : 366

        const endDate =  moment(Number(pakiet.payDate)).add(days, "d")
        setEndDate(endDate.format("DD.MM.YYYY"))

        const leftDays = - moment().diff(endDate, "days")

        console.log('useEffect packages', midlePrice, pakiet.price, pakiet.lengthCoeff, days, leftDays)

        const updPriceToMiddlePakiet =  Math.ceil((midlePrice - pakiet.price) * pakiet.lengthCoeff / days * leftDays)
        const updPriceToHighPakiet =  Math.ceil((highPrice - pakiet.price) * pakiet.lengthCoeff / days * leftDays)
        setUpdPriceToMiddlePakiet(updPriceToMiddlePakiet)
        setUpdPriceToHighPakiet(updPriceToHighPakiet)

    }, [packages])

    async function getUserPackages(){
        console.log('getUserPackagesRecords')
        const token = await auth.currentUser.getIdToken()
        const response = await axios({
            url: "/api/getuserpackages",
            method: "POST",
            data:{ token }
        })
        console.log('response', response)
        const packages = response.data.packages.sort((a,b)=>b.payDate - a.payDate)
        console.log('getUserPackagesRecords', packages)
        dispatch(setPackages(packages))
        return packages
    }

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
                {packageName && packageName === "Wirtualny adres" && 
                    <Panel 
                        header={<Header  isMain={packageName === "Wirtualny adres"} packageName="Wirtualny adres" endDate={endDate}/>}
                        // header={`Wirtualny adres ${packageName==="Wirtualny adres" ? ` - kończy się ${endDate}` : ''}`} 
                        key="1"
                    >
                    <p>Profesjonalny adres z obsługą poczty i odbieraniem połączeń telefonicznych oraz dostęp bez rezerwacji do naszej globalnej sieci salonów biznesowych</p>
                    <PakietTableFirst/>
                    {/* <PackietButtons/> */}
                </Panel>}
                {packageName && packageName !== "Profesjonalne biuro" &&  
                    <Panel 
                        header={<Header  isMain={packageName === "Optymalny pakiet"} packageName="Optymalny pakiet" endDate={endDate} updPrice={updPriceToMiddlePakiet}/>}
                        key="2"
                    >
                    <p>Profesjonalny adres z obsługą poczty i odbieraniem połączeń telefonicznych oraz dostęp bez rezerwacji do naszej globalnej sieci salonów biznesowych</p>
                    <PakietTableFirst/>
                    {/* <PackietButtons/> */}
                </Panel>}
                {packageName && 
                    <Panel 
                        header={<Header  isMain={packageName === "Profesjonalne biuro"} packageName="Profesjonalne biuro" endDate={endDate} updPrice={updPriceToHighPakiet}/>}
                        key="3">
                    <p>Profesjonalny adres z obsługą poczty i odbieraniem połączeń telefonicznych oraz dostęp bez rezerwacji do naszej globalnej sieci salonów biznesowych</p>
                    <PakietTableFirst/>
                    {/* <PackietButtons/> */}
                </Panel>}
            </Collapse>
        </div>
    )
}

export default KontoPackages
