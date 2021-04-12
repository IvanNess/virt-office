import React, { useEffect, useState } from 'react'

import styles from '../styles/CennikChoices.module.scss'
import Link from 'next/link'
import { Checkbox } from 'antd'
import initCheckboxValues from '../accessories/user-package-choices'
import { useDispatch } from 'react-redux'
import { updateHiringChoice } from '../redux/actions'
import { useRouter } from 'next/router'

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
            value: `Twój pakiet (${updPrice} PLN/miesiąc)`
        }))
        dispatch(updateHiringChoice({ number: 1, prop: "price", value: updPrice }))
        dispatch(updateHiringChoice({ number: 1, prop: "isComplete", value: true }))
    }
    
    const selectBlock = idx =>{
        if(router.pathname==='/cennik')
            return
        setSelectedBlock(idx)
        dispatch(updateHiringChoice({
            number: 1, 
            prop: "choice", 
            value: idx===0 ? "Wirtualny adres (55 PLN/miesiąc)":
                idx===2 ? "Profesjonalne biuro (450 PLN/miesiąc)":
                `Twój pakiet (${price} PLN/miesiąc)`
        }))
        dispatch(updateHiringChoice({
            number: 1, 
            prop: "price", 
            value: idx===0 ? 55:
                idx===2 ? 450: price
        }))
        dispatch(updateHiringChoice({ number: 1, prop: "isComplete", value: true }))
    }

    return (
        <div className={styles.cennikChoices}>
            <div className={styles.blocks} style={{marginRight}}>
                
                <div className={selectedBlock===0 ? styles.selectedBlock : styles.block} 
                    onClick={()=>selectBlock(0)}
                    style={{cursor: router.pathname==='/cennik'? 'auto': 'pointer'}}
                >
                    <div className={styles.blockTitle}>Wirtualny adres</div>
                    <div className={styles.digit}>55</div>
                    <div className={styles.afterDigit}>PLN/miesiąc</div>
                    {router.pathname === '/cennik' && <div className={styles.blockLinkButton}>
                        <Link href="/wynajecie"><a>Wynajmij biuro</a></Link>
                    </div>}
                    
                    <div className={styles.description}>
                        <p>
                            - adres na potrzeby rejestracji firmy 
                            <br/>
                            - powiadomienie o korespondencji 
                            <br/>
                            - skanowanie korespondencji i udostępnienie w chmurze * do 20 dokumentów miesięcznie do 100 MB 
                            <br/>
                            - archiwizacja dokumentów w zabezpieczonym pomieszczeniu * jeden segregator na jeden rok 
                            <br/>
                            - dostęp do sali konferencyjnej przez 2 godziny miesięcznie 
                            <br/>
                            <br/>
                            Cena nie zawiera VAT

                        </p>
                    </div>                    
                </div>

                <div className={selectedBlock===1 ? styles.selectedBlock : 
                    selectedBlock===null? styles.mainBlock: styles.block} 
                    onClick={()=>selectBlock(1)}
                    style={{cursor: router.pathname==='/cennik'? 'auto': 'pointer'}}
                >
                    <div className={styles.blockTitle}>Twój pakiet</div>
                    <div className={styles.digit}>{price}</div>
                    <div className={styles.afterDigit}>PLN/miesiąc</div>
                    {router.pathname === '/cennik' && <div className={styles.blockLinkButton}>
                        <Link href="/wynajecie"><a>Wynajmij biuro</a></Link>
                    </div>}
                    {showSlash && <div className={selectedBlock===1 || selectedBlock===null ? styles.slash : styles.noslash}>////</div>}
                    <div className={styles.description}>
                        <p>
                            Tutaj klient wybiera dowolnie skład pakietu z dostępnych opcji
                            <br/>
                            <br/>
                            {checkBoxes.map(({idx, text})=>( 
                                <>
                                    <Checkbox onChange={(value)=>{checkChanged(value, idx)}} key={idx} defaultChecked={true}>
                                        {text}
                                    </Checkbox>
                                    <br/>
                                </>    
                            ))}
                            <br/>
                            <br/>
                            Cena nie zawiera VAT
                        </p>
                    </div>                    
                </div>

                <div 
                    className={selectedBlock===2 ? styles.selectedBlock : styles.block} 
                    onClick={()=>selectBlock(2)}
                    style={{cursor: router.pathname==='/cennik'? 'auto': 'pointer'}}
                >
                    <div className={styles.blockTitle}>Profesjonalne biuro</div>
                    <div className={styles.digit}>450</div>
                    <div className={styles.afterDigit}>PLN/miesiąc</div>
                    {router.pathname === '/cennik' && <div className={styles.blockLinkButton}>
                        <Link href="/wynajecie"><a>Wynajmij biuro</a></Link>
                    </div>}
                    
                    <div className={styles.description}>
                        <p>
                            - adres na potrzeby rejestracji firmy <br/>
                            - powiadomienie o korespondencji <br/>
                            - nielimitowana liczba skanowanych dokumentów i udostępnienie w chmurze do 2 GB <br/>
                            - archiwizacja dokumentów w zabezpieczonym pomieszczeniu * pięć segregatorów na jeden rok <br/>
                            - wysyłanie korespondencji na wskazany adres 1 raz w tygodniu <br/>
                            - dostęp do sali konferencyjnej przez 10 godzin miesięcznie <br/>
                            - biuro rachunkowe <br/>
                            <br/>
                            Cena nie zawiera VAT
                        </p>
                    </div>                    
                </div>
            </div>
        </div>
    )
}

export default CennikChoices