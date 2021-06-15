import React, { useEffect } from 'react'
import styles from '../../styles/Rozliczenia.module.scss'
import moment from 'moment'

import ProfileBoilerplate from '../../components/profile-boilerplate'

import { Select, Skeleton } from 'antd';
import axios from 'axios';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import Sidebar from '../../components/side-bar';
import { phrases } from '../../accessories/constants';

const { Option } = Select;

function Rozliczenia({db, auth}) {

    function handleChange(){}

    const currentUser = useSelector(state=>state.currentUser)
    const language = useSelector(state=>state.language)

    const [records, setRecords] = useState(null)
    const [langRecords, setLangRecords] = useState(null)

    const skeletonBtn =  <Skeleton.Button active={true} size="small"/>
    const skeletonAvtr = <Skeleton.Avatar active={true} size="small"/>
    const skeletonInput = <Skeleton.Input style={{ width: 400, marginTop: '2px' }} active={true} size="small" />


    useEffect(()=>{
        console.log('use effect rozliczenia', currentUser)
        if(currentUser){
            Promise.all([getUserPackagesRecords(), getUserReservationsRecords()])
            .then(recordsArrs=>{
                const records = [...recordsArrs[0], ...recordsArrs[1]].sort((a, b)=>a.data - b.data)
                setRecords(records)
                setLangRecords(records)
                console.log(records)
            })
        }
    }, [currentUser])



    async function getUserReservationsRecords(){
        const token = await auth.currentUser.getIdToken()
        const response = await axios({
            url: "/api/getuserreservations",
            method: "POST",
            data:{ token }
        })
        console.log('getUserReservationsRecords', response)

        const reservations = response.data.reservations

        const records = reservations.map(({day, month, year, total, startHour, finishHour, payDate, paymentIntent, receiptUrl})=>{
            return {
                name: `Rezerwacja biura ${day}/${month}/${year} ${startHour.title}-${finishHour.title}`,
                data: payDate,
                price: total,
                paymentIntent,
                receiptUrl
            }
        })
        console.log('getUserReservationsRecords', records)
        return records 
    }

    useEffect(()=>{
        const updRecords = records && records.map((record)=>{
            let updRecordName = record.name
            if(record.name.includes('Rezerwacja biura'))
                return {...record, name: record.name.replace('Rezerwacja biura', phrases[language]?.rezerwacja)}      
            if(record.name.includes('zaktualizowany')){
                updRecordName = record.name.replace('zaktualizowany', phrases[language]?.updated)       
                updRecordName = updPackTitle(updRecordName)
                updRecordName = updPeriodTitle(updRecordName)
                return {...record, name: updRecordName.replace('Pakiet', phrases[language]?.pakiet)}      
            }
            if(record.name.includes('Pakiet')){
                updRecordName = record.name.replace('Pakiet', phrases[language]?.pakiet)      
                updRecordName = updPeriodTitle(updRecordName)
            }
            return {...record, name: updPackTitle(updRecordName)}

            function updPackTitle(record){
                if(record.includes('Wirtualny adres'))
                    return record.replace('Wirtualny adres', phrases[language]?.cennikTitleOne)
                if(record.includes('Optymalny pakiet'))
                    return record.replace('Optymalny pakiet', phrases[language]?.cennikTitleTwo)
                if(record.includes('Profesjonalne biuro'))
                    return record.replace('Profesjonalne biuro', phrases[language]?.cennikTitleThree)
                return record
            }

            function updPeriodTitle(record){
                if(record.includes('Miesiąc'))
                    return record.replace('Miesiąc', phrases[language]?.month)
                if(record.includes('Kwartał'))
                    return record.replace('Kwartał', phrases[language]?.kwartal)
                if(record.includes('Rok'))
                    return record.replace('Rok', phrases[language]?.year)
                return record
            }
            
        })
        setLangRecords(updRecords)
    }, [language])

    async function getUserPackagesRecords(){
        console.log('getUserPackagesRecords')
        const token = await auth.currentUser.getIdToken()
        const response = await axios({
            url: "/api/getuserpackages",
            method: "POST",
            data:{ token }
        })
        console.log('response', response)
        const packages = response.data.packages
        const records = packages.map(({pakietName, hiredPeriod, payDate, price, fullPrice, paymentIntent, receiptUrl})=>{
            return {
                name: pakietName.includes('zaktualizowany')? `Pakiet "${pakietName}"` : `Pakiet "${pakietName}" - ${hiredPeriod}`,
                data: payDate,
                price: fullPrice,
                paymentIntent,
                receiptUrl
            }
        })
        console.log('getUserPackagesRecords', records)
        return records  
    }

    return (
        <div className={styles.rozliczeniaFaktury} style={{display: language? 'block': 'none'}}>
            <ProfileBoilerplate  auth={auth} db={db}>
                <Sidebar color='#4CAED5' auth={auth}/>
                <div className={styles.title}>3. <span className={styles.bold}>{phrases[language]?.rozliczenia}</span></div>
                <div className={styles.text}>
                    <div className={styles.small}>{phrases[language]?.packDescription2}</div>
                </div>

                <div className={styles.table}>

                <div className="rozliczeniaSelect">
                    <Select defaultValue="Wszystkie" onChange={handleChange}>
                        <Option value="Wszystkie">{phrases[language]?.all}</Option>
                        <Option value="Obecny miesiąc">{phrases[language]?.currentMonth}</Option>
                    </Select>
                </div>
               

                    <div className={styles.headerRow}>
                        <div className={styles.firstRow}>{phrases[language]?.number}</div>
                        <div className={styles.secondRow}>{phrases[language]?.nazwa}</div>
                        <div className={styles.thirdRow}>{phrases[language]?.date}</div>
                        <div className={styles.fourthRow}>{phrases[language]?.wartosc}</div>
                        {/* <div className={styles.fifthRow}>{phrases[language]?.receipt}</div> */}
                    </div>
                    {/* <div className={styles.row}>
                        <div className={styles.firstRow}>3/234/234</div>
                        <div className={styles.secondRow}>Lorem ipsum dolor sit amet, consetetur sadipscing.</div>
                        <div className={styles.thirdRow}>23/12/2020</div>
                        <div className={styles.fourthRow}>1 500 zł Brutto</div>
                    </div> */}
                    {records===null && [0, 1, 2].map((record, idx)=>(
                        <div className={styles.row}>
                            <div className={styles.firstRow}>{skeletonAvtr}</div>
                            <div className={styles.secondRow}>{skeletonInput}</div>
                            <div className={styles.thirdRow}>{skeletonBtn}</div>
                            <div className={styles.fourthRow}>{skeletonBtn}</div>
                            {/* <div className={styles.fifthRow}>{skeletonBtn}</div> */}
                        </div>
                    ))}
                    {langRecords && langRecords.map((record, idx)=>(
                        <div className={styles.row}>
                            <div className={styles.firstRow}>{idx+1}</div>
                            <div className={styles.secondRow}>{record.name}</div>
                            <div className={styles.thirdRow}>{moment(Number(record.data)).format('DD/MM/YYYY')}</div>
                            <div className={styles.fourthRow}>{`${record.price}zł`}</div>
                            {/* <div className={styles.fifthRow}><a href={record.receiptUrl} target="_blank">{phrases[language]?.receipt}</a></div> */}
                        </div>
                    ))}
                </div>
            </ProfileBoilerplate>       
        </div>
    )
}

export default Rozliczenia
