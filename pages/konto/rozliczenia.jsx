import React, { useEffect } from 'react'
import styles from '../../styles/Rozliczenia.module.scss'
import moment from 'moment'

import ProfileBoilerplate from '../../components/profile-boilerplate'

import { Select, Skeleton } from 'antd';
import axios from 'axios';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import Link from 'next/link';

const { Option } = Select;

function Rozliczenia({db, auth}) {

    function handleChange(){}

    const currentUser = useSelector(state=>state.currentUser)

    const [records, setRecords] = useState(null)

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
                name: `Rezerwacja Biura ${day}/${month}/${year} ${startHour.title}-${finishHour.title}`,
                data: payDate,
                price: total,
                paymentIntent,
                receiptUrl
            }
        })
        console.log('getUserReservationsRecords', records)
        return records 
    }

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
                name: pakietName.includes('zaktualizowany')? `Pakiet ${pakietName}` : `Pakiet ${pakietName} - ${hiredPeriod}`,
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
        <div className={styles.rozliczeniaFaktury}>
            <ProfileBoilerplate  auth={auth} db={db}>
                <div className={styles.title}>3. <span className={styles.bold}>Rozliczenia</span></div>
                <div className={styles.text}>
                    <div className={styles.small}>Wpisz nazwę lub kod pocztowy miasta, w którym chcesz wybrać adres firmy. Dostępne adresy i miesięczny koszt wyświetlą się poniżej.</div>
                </div>

                <div className={styles.table}>

                <div className="rozliczeniaSelect">
                    <Select defaultValue="Wszystkie" onChange={handleChange}>
                        <Option value="Wszystkie">Wszystkie</Option>
                        <Option value="Obecny miesiąc">Obecny miesiąc</Option>
                    </Select>
                </div>
               

                    <div className={styles.headerRow}>
                        <div className={styles.firstRow}>Nr</div>
                        <div className={styles.secondRow}>Nazwa</div>
                        <div className={styles.thirdRow}>Data</div>
                        <div className={styles.fourthRow}>Wartość</div>
                        {/* <div className={styles.fifthRow}>Paragon</div> */}
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
                            <div className={styles.fifthRow}>{skeletonBtn}</div>
                        </div>
                    ))}
                    {records && records.map((record, idx)=>(
                        <div className={styles.row}>
                            <div className={styles.firstRow}>{idx+1}</div>
                            <div className={styles.secondRow}>{record.name}</div>
                            <div className={styles.thirdRow}>{moment(Number(record.data)).format('DD/MM/YYYY')}</div>
                            <div className={styles.fourthRow}>{`${record.price} zł`}</div>
                            <div className={styles.fifthRow}><a href={record.receiptUrl} target="_blank">Paragon</a></div>
                        </div>
                    ))}
                </div>
            </ProfileBoilerplate>       
        </div>
    )
}

export default Rozliczenia
