import React, { useEffect, useState } from 'react'

import styles from '../styles/CennikChoices.module.scss'
import Link from 'next/link'
import { Checkbox } from 'antd'
import initCheckboxValues from '../accessories/user-package-choices'
import { useDispatch, useSelector } from 'react-redux'
import { updateHiringChoice, setHiringChoiceNumber } from '../redux/actions'
import { useRouter } from 'next/router'
import WynajmijButton from './wynajmij-button'
import { phrases, buttonNames } from '../accessories/constants'
import CennikChoiceOneDescription from './cennik/cennik-choice-one-description'
import CennikChoiceTwoDescription from './cennik/cennik-choice-two-description'
import CennikChoiceThreeDescription from './cennik/cennik-choice-three-description'

const CennikChoices = ({marginRight="149px", showSlash=true}) => {

    const [checkBoxes, setCheckboxes] = useState(initCheckboxValues)

    const [price, setPrice] = useState(initCheckboxValues.reduce((res, item)=> res + item.price, 0))
    const [selectedBlock, setSelectedBlock] = useState(null)
    const router = useRouter()
    const hiringChoices = useSelector(state=>state.hiringChoices)
    const language = useSelector(state=>state.language)

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
        if(router.asPath.includes('/cennik') && !isBtn)
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
        const lengthCoeff = hiringChoices[1].lengthCoeff || 1
        console.log('lengthCoeff', lengthCoeff)
        const priceResult = idx===0 ? 55: idx===2 ? 450: price
        dispatch(updateHiringChoice({
            number: 1, 
            prop: "price", 
            value: priceResult
        }))
        dispatch(updateHiringChoice({ number: 1, prop: "isComplete", value: true }))
        if(hiringChoices[1].lengthCoeff){
            dispatch(updateHiringChoice({ number: 2, prop: "fullPrice", value: priceResult * hiringChoices[1].lengthCoeff }))
        }
        if(isBtn){
            dispatch(setHiringChoiceNumber(2))
            router.push(`/${language}/wynajecie`)
        }
    }

    const getBlocksClassName = () =>{
        return (router.asPath.includes('/cennik'))? styles.blocks: styles.kontoBlocks
    }

    return (
        <div className={styles.cennikChoices}>
            <div className={getBlocksClassName()} style={{marginRight}}>
                
                <div className={router.asPath.includes('/cennik')? styles.cennikBlock: selectedBlock===0 ? styles.selectedBlock : styles.block} 
                    onClick={()=>selectBlock(0)}
                    style={{cursor: router.asPath.includes('/cennik')? 'auto': 'pointer'}}
                >

                    <div className={styles.main}>
                        <div className={styles.blockTitle}>{phrases[language]?.cennikTitleOne}</div>
                        <div className={styles.digit}>55</div>
                        <div className={styles.afterDigit}>{phrases[language]?.plnPerMonth}</div>
                        {router.asPath.includes('/cennik') && <div className={styles.wynajmijBtn} onClick={()=>selectBlock(0, true)}>
                            {buttonNames[language]?.wynajecie}
                        </div>}
                        {/* {router.pathname === '/cennik' && <WynajmijButton/>} */}
                    </div>
                    <CennikChoiceOneDescription/>             
                </div>

                <div className={router.asPath.includes('/cennik')? styles.cennikMainBlock: selectedBlock===1 ? styles.selectedBlock : 
                    selectedBlock===null? styles.mainBlock: styles.block} 
                    onClick={()=>selectBlock(1)}
                    style={{cursor: router.asPath.includes('/cennik')? 'auto': 'pointer'}}
                >
                    <div className={styles.main}>
                        <div className={styles.blockTitle}>{phrases[language]?.cennikTitleThree}</div>
                        <div className={styles.digit}>{price}</div>
                        <div className={styles.afterDigit}>{phrases[language]?.plnPerMonth}</div>
                        {router.asPath.includes('/cennik') && <div className={styles.wynajmijBtn} onClick={()=>selectBlock(1, true)}>
                            {buttonNames[language]?.wynajecie}
                        </div>}
                        {/* {router.pathname === '/cennik' && <WynajmijButton/>} */}
                        {/* {showSlash && <div className={selectedBlock===1 || selectedBlock===null ? styles.slash : styles.noslash}>////</div>} */}
                    </div>

                    <div className={styles.slashWrapper}> 
                        <div className={styles.slash}></div>
                    </div>

                    {/* <div className={styles.description}> */}
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
                    {/* </div>    */}
                    <CennikChoiceTwoDescription/>                 
                </div>

                <div 
                    className={router.asPath.includes('/cennik')? styles.cennikBlock: selectedBlock===2 ? styles.selectedBlock : styles.block} 
                    onClick={()=>selectBlock(2)}
                    style={{cursor: router.asPath.includes('/cennik')? 'auto': 'pointer'}}
                >
                    <div className={styles.main}>
                        <div className={styles.blockTitle}>{phrases[language]?.cennikTitleThree}</div>
                        <div className={styles.digit}>450</div>
                        <div className={styles.afterDigit}>{phrases[language]?.plnPerMonth}</div>
                        {router.asPath.includes('/cennik') && <div className={styles.wynajmijBtn} onClick={()=>selectBlock(2, true)}>
                            {buttonNames[language]?.wynajecie}
                        </div>}
                        {/* {router.pathname === '/cennik' && <WynajmijButton/>} */}
                    </div>
                    
                    <CennikChoiceThreeDescription/>           
                </div>
            </div>
        </div>
    )
}

export default CennikChoices