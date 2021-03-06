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
import { updatePackagePay, przelewyUpdatePackagePay } from '../utilities'
import { useRouter } from 'next/router'
import PakietTableSecond from './pakiet-table-second'
import PakietTableThird from './pakiet-table-third'
import { phrases, buttonNames, packageMonthDays, packageKwartalDays, packageYearDays } from '../accessories/constants'
const { Panel } = Collapse;

const Header = ({isMain, packageName, endDate, updPrice=null, auth, price, pakiet})=>{

    const email = useSelector(state=>state.currentUser.email)
    const router = useRouter()

    const language = useSelector(state=>state.language)

    const update = (e)=>{
        e.stopPropagation(); 
        console.log('update pakiet')
        // updatePackagePay({
        przelewyUpdatePackagePay({
            auth, 
            pakietTitle: packageName, 
            pakietName: `${phrases[language]?.updated} - ${packageName} (${price} ${phrases[language]?.plnPerMonth})`, 
            hiredPeriod: pakiet.hiredPeriod, 
            price, 
            fullPrice: updPrice, 
            lengthCoeff: pakiet.lengthCoeff,  
            startDate: pakiet.startDate,
            email,
            router,
            // language,
            // country
        })
    }

    const linkBtnClicked = (e)=>{
        e.stopPropagation()
    }

    return(
    <div className={styles.header}>
        <div className={isMain? styles.mainPackageName : styles.packageName}>{packageName}</div>
        {isMain && <div className={styles.endDate}>{`${phrases[language]?.ended} ${endDate}`}</div>}
        {updPrice && <button className={styles.updateBtn} onClick={update}>{`${phrases[language]?.changePackage} (${updPrice} z??)`}</button>}
        {!isMain && !updPrice && <div className={styles.linkBtn} onClick={linkBtnClicked}><Link href='/wynajecie'><a>
            {buttonNames[language]?.wynajecie}
        </a></Link></div>}
    </div>
)}

const KontoPackages = ({auth}) => {

    const midlePrice = 150
    const highPrice = 450

    const [updPriceToMiddlePakiet, setUpdPriceToMiddlePakiet] = useState(null)
    const [updPriceToHighPakiet, setUpdPriceToHighPakiet] = useState(null)

    const [packageName, setPackageName] = useState(null)
    const [endDate, setEndDate] = useState(null)
    const [pakiet, setPakiet] = useState(null)

    const currentUser = useSelector(state=>state.currentUser)
    const packages = useSelector(state=>state.packages)
    const language = useSelector(state=>state.language)

    const dispatch = useDispatch()

    // useEffect(()=>{
    //     console.log('use effect pakiet', currentUser)
    //     if(currentUser && !packages){
    //         getUserPackages()
    //     }
    // }, [currentUser, packages])

    useEffect(()=>{
        console.log('packages', packages)
        if(!packages)
            return
        const pakiet = packages[0]

        if(!pakiet){
            setPakiet(false)
            return
        }
        setPakiet(pakiet)

        const packageName = pakiet.pakietName.includes('Wirtualny adres') ? "Wirtualny adres" :
            pakiet.pakietName.includes('Profesjonalne biuro') ? "Profesjonalne biuro" : "Optymalny pakiet"
        console.log('packageName', packageName)
        setPackageName(packageName)

        const days = pakiet.days || (pakiet.hiredPeriod === "Miesi??c" ? packageMonthDays : 
            pakiet.hiredPeriod === "Kwarta??" ? packageKwartalDays : packageYearDays)
        // const days = pakiet.hiredPeriod === "Miesi??c" ? 31 :
        //     pakiet.hiredPeriod === "Kwarta??" ? 93 : 366

        // const endDate =  moment(pakiet.startDate).add(days, "d")
        const endDate = pakiet.endDate || moment(pakiet.startDate).add(days, "d")
        setEndDate(moment(endDate).format("DD.MM.YYYY"))

        const leftDays = - moment().diff(endDate, "days")

        console.log('useEffect packages', midlePrice, pakiet.price, pakiet.lengthCoeff, days, leftDays)

        const updPriceToMiddlePakiet = packageName === "Wirtualny adres" || packageName === "Profesjonalne biuro" ? 
            Math.ceil((midlePrice - pakiet.price) * pakiet.lengthCoeff / days * leftDays) : undefined
        const updPriceToHighPakiet =  packageName !== "Profesjonalne biuro" ? 
            Math.ceil((highPrice - pakiet.price) * pakiet.lengthCoeff / days * leftDays) : undefined
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
                text='Profesjonalny adres z obs??ug?? poczty i odbieraniem po????cze?? telefonicznych oraz dost??p bez rezerwacji do naszej globalnej sieci salon??w biznesowych'
            >
                <PakietTableFirst/>
                <PackietButtons/>
            </Package>
            <Package 
                id={2}
                openedId={openedId}
                setOpenedId={setOpenedId}
                title='Biuro wirtualne' 
                text='Profesjonalny adres z obs??ug?? poczty i odbieraniem po????cze?? telefonicznych oraz dost??p bez rezerwacji do naszej globalnej sieci salon??w biznesowych'
                >
                <PakietTableFirst/>
                <PackietButtons/>
            </Package>       
            <Package 
                id={3}
                openedId={openedId}
                setOpenedId={setOpenedId}
                title='Pakiet biura wirtualnego plus' 
                text='Profesjonalny adres z obs??ug?? poczty i odbieraniem po????cze?? telefonicznych oraz dost??p bez rezerwacji do naszej globalnej sieci salon??w biznesowych'
                >
                <PakietTableFirst/>
                <PackietButtons/>
            </Package> */}
            <Collapse accordion>
                {(pakiet === false || (packageName && packageName === "Wirtualny adres")) && 
                    <Panel 
                        header={<Header 
                            isMain={packageName === "Wirtualny adres"} 
                            packageName={phrases[language]?.cennikTitleOne} 
                            endDate={endDate}
                        />}
                        // header={`Wirtualny adres ${packageName==="Wirtualny adres" ? ` - ko??czy si?? ${endDate}` : ''}`} 
                        key="1"
                    >
                    <p>{phrases[language]?.packDescription1}</p>
                    <PakietTableFirst/>
                    {/* <PackietButtons/> */}
                </Panel>}
                {(pakiet===false || (packageName && packageName !== "Profesjonalne biuro")) &&  
                    <Panel 
                        header={<Header 
                            isMain={packageName === "Optymalny pakiet"} 
                            packageName={phrases[language]?.cennikTitleTwo} 
                            endDate={endDate} 
                            updPrice={updPriceToMiddlePakiet}
                            auth={auth}
                            price={150}
                            pakiet = {pakiet}                                                        
                        />}
                        key="2"
                    >
                    <p>{phrases[language]?.packDescription1}</p>
                    <PakietTableSecond/>
                    {/* <PackietButtons/> */}
                </Panel>}
                {(pakiet===false || packageName) && 
                    <Panel 
                        header={<Header  
                            isMain={packageName === "Profesjonalne biuro"} 
                            packageName={phrases[language]?.cennikTitleThree} 
                            endDate={endDate} 
                            updPrice={updPriceToHighPakiet}
                            auth={auth}
                            price={450}
                            pakiet={pakiet}
                        />}
                        key="3">
                    <p>{phrases[language]?.packDescription1}</p>
                    <PakietTableThird/>
                    {/* <PackietButtons/> */}
                </Panel>}
            </Collapse>
        </div>
    )
}

export default KontoPackages
