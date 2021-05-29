import React, { useEffect, useState } from 'react'

import styles from '../styles/CennikChoices.module.scss'
import Link from 'next/link'
import { Checkbox } from 'antd'
import initCheckboxValues from '../accessories/user-package-choices'
import { useDispatch } from 'react-redux'
import { updateHiringChoice, setHiringChoiceNumber } from '../redux/actions'
import { useRouter } from 'next/router'
import WynajmijButton from './wynajmij-button'

const CennikChoices = ({marginRight="149px", showSlash=true}) => {

    const [checkBoxes, setCheckboxes] = useState(initCheckboxValues)

    const [price, setPrice] = useState(initCheckboxValues.reduce((res, item)=> res + item.price, 0))
    const [selectedBlock, setSelectedBlock] = useState(null)
    const router = useRouter()

    const dispatch = useDispatch()

    const checkChanged = (value, idx)=>{
        console.log(value, idx)
        const checked = value.target.checked
        const upd = [...checkBoxes]
        upd[idx].checked = checked
        const newPrice = upd.reduce((res, item)=> item.checked? res + item.price : res, 0)
        const updPrice = newPrice >= 30 ? newPrice : 30
        setPrice(updPrice)
        setCheckboxes(upd)

        dispatch(updateHiringChoice({
            number: 1, 
            prop: "choice", 
            value: `Optymalny pakiet (${updPrice} PLN/miesiąc)`
        }))
        dispatch(updateHiringChoice({ number: 1, prop: "pakietTitle", value: `Optymalny pakiet` }))
        dispatch(updateHiringChoice({ number: 1, prop: "price", value: updPrice }))
        dispatch(updateHiringChoice({ number: 1, prop: "isComplete", value: true }))
    }
    
    const selectBlock = (idx, isBtn=false) =>{
        if(router.pathname==='/cennik' && !isBtn)
            return
        setSelectedBlock(idx)
        dispatch(updateHiringChoice({
            number: 1, 
            prop: "choice", 
            // value: idx===0 ? "Wirtualny adres (55 PLN/miesiąc)":
            //     idx===2 ? "Profesjonalne biuro (450&nbsp;PLN/miesiąc)":
            //     `Optymalny pakiet (${price} PLN/miesiąc)`
            value: idx===0 ? "Wirtualny adres":
                idx===2 ? "Profesjonalne biuro":
                `Optymalny pakiet`
        }))
        dispatch(updateHiringChoice({
            number: 1, 
            prop: "pakietTitle", 
            value: idx===0 ? "Wirtualny adres": idx===2 ? "Profesjonalne biuro":`Optymalny pakiet`
        }))
        dispatch(updateHiringChoice({
            number: 1, 
            prop: "price", 
            value: idx===0 ? 55:
                idx===2 ? 450: price
        }))
        dispatch(updateHiringChoice({ number: 1, prop: "isComplete", value: true }))
        if(isBtn){
            dispatch(setHiringChoiceNumber(2))
            router.push('/wynajecie')
        }
    }

    const getBlocksClassName = () =>{
        return (router.pathname==='/cennik')? styles.blocks: styles.kontoBlocks
    }

    return (
        <div className={styles.cennikChoices}>
            <div className={getBlocksClassName()} style={{marginRight}}>
                
                <div className={router.pathname==='/cennik'? styles.cennikBlock: selectedBlock===0 ? styles.selectedBlock : styles.block} 
                    onClick={()=>selectBlock(0)}
                    style={{cursor: router.pathname==='/cennik'? 'auto': 'pointer'}}
                >

                    <div className={styles.main}>
                        <div className={styles.blockTitle}>Wirtualny adres</div>
                        <div className={styles.digit}>55</div>
                        <div className={styles.afterDigit}>PLN/miesiąc</div>
                        {router.pathname === '/cennik' && <div className={styles.wynajmijBtn} onClick={()=>selectBlock(0, true)}>
                            Wynajmij Adres
                        </div>}
                    </div>
                     
                    <div className={styles.description}>
                        <p>
                            - adres na potrzeby rejestracji i prowadzenia firmy 
                            <br/>
                            - powiadomienie o korespondencji
                            <br/>
                            - skanowanie i przesyłanie e-mailem korespondencji przychodzącej do 20 dokumentów lub 100 MB miesięcznie 
                            <br/>
                            - archiwizacja dokumentów w zabezpieczonym pomieszczeniu - jeden segregator a4 na jeden rok
                            <br/>
                            - dostęp do sali konferencyjnej przez 2 godziny miesięcznie 
                            <br/>
                            - Pakiet Fakturowanie + Magazyn z serwisu wfirma.pl w pierwszym roku korzystania z virtoffice.pl
                            <br/>
                            <br/>
                            Cena nie zawiera podatku VAT

                        </p>
                    </div>                    
                </div>

                <div className={router.pathname==='/cennik'? styles.cennikMainBlock: selectedBlock===1 ? styles.selectedBlock : 
                    selectedBlock===null? styles.mainBlock: styles.block} 
                    onClick={()=>selectBlock(1)}
                    style={{cursor: router.pathname==='/cennik'? 'auto': 'pointer'}}
                >
                    <div className={styles.main}>
                        <div className={styles.blockTitle}>Optymalny pakiet</div>
                        <div className={styles.digit}>{price}</div>
                        <div className={styles.afterDigit}>PLN/miesiąc</div>
                        {router.pathname === '/cennik' && <div className={styles.wynajmijBtn} onClick={()=>selectBlock(1, true)}>
                            Wynajmij Adres
                        </div>}
                        {/* {showSlash && <div className={selectedBlock===1 || selectedBlock===null ? styles.slash : styles.noslash}>////</div>} */}
                    </div>

                    <div className={styles.slashWrapper}> 
                        <div className={styles.slash}></div>
                    </div>

                    <div className={styles.description}>
                        {/* <p>
                            Tutaj klient wybiera dowolnie skład pakietu z dostępnych opcji
                            <br/>
                            <br/>
                            {checkBoxes.map(({idx, text})=>( 
                                <span key={idx}>
                                    <Checkbox onChange={(value)=>{checkChanged(value, idx)}} key={idx} defaultChecked={true}>
                                        {text}
                                    </Checkbox>
                                    <span key={idx}>{`- ${text}`}</span>
                                    <br/>
                                </span>    
                            ))}
                            <br/>
                            <br/>
                            Cena nie zawiera podatku VAT
                        </p> */}
                        <p>
                            - adres na potrzeby rejestracji i prowadzenia firmy <br/>
                            - powiadomienie o korespondencji <br/>
                            - skanowanie i przesyłanie e-mailem korespondencji przychodzącej do 100 dokumentów lub 500 MB miesięcznie <br/>
                            - archiwizacja dokumentów w zabezpieczonym pomieszczeniu do 2 segregatorów na jeden rok <br/>
                            - wysyłanie korespondencji na wskazany adres 1 raz w tygodniu <br/>
                            - dostęp do sali konferencyjnej przez 5 godzin miesięcznie <br/>
                            - Pakiet Księgowość online + Asystent Księgowy z serwisu wfirma.pl <br/>
                            <br/>
                            Cena nie zawiera podatku VAT
                        </p>
                    </div>                    
                </div>

                <div 
                    className={router.pathname==='/cennik'? styles.cennikBlock: selectedBlock===2 ? styles.selectedBlock : styles.block} 
                    onClick={()=>selectBlock(2)}
                    style={{cursor: router.pathname==='/cennik'? 'auto': 'pointer'}}
                >
                    <div className={styles.main}>
                        <div className={styles.blockTitle}>Profesjonalne biuro</div>
                        <div className={styles.digit}>450</div>
                        <div className={styles.afterDigit}>PLN/miesiąc</div>
                        {router.pathname === '/cennik' && <div className={styles.wynajmijBtn} onClick={()=>selectBlock(2, true)}>
                            Wynajmij Adres
                        </div>}
                    </div>
                    
                    <div className={styles.description}>
                        <p>
                            - adres na potrzeby rejestracji i prowadzenia firmy <br/>
                            - wystawianie i wysyłanie drogą elektroniczną do 50 faktur miesięcznie w serwisie wfirma.pl <br/>
                            - powiadomienie o korespondencji<br/>
                            - nielimitowana liczba skanowanych i przesyłanych e-mailem dokumentów <br/>
                            - udostępnienie zarchiwizowanych dokumentów w chmurze do 2GB <br/>
                            - archiwizacja dokumentów w zabezpieczonym pomieszczeniu pięć segregatorów na jeden rok <br/>
                            - wysyłanie korespondencji na wskazany adres 1 raz w tygodniu <br/>
                            - dostęp do sali konferencyjnej przez 10 godzin miesięcznie <br/>
                            - Pakiet Biuro rachunkowe z serwisu wfirma.pl <br/>
                            <br/>
                            Cena nie zawiera podatku VAT
                        </p>
                    </div>                    
                </div>
            </div>
        </div>
    )
}

export default CennikChoices