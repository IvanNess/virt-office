import React, { useState, useEffect } from 'react'
import styles from '../styles/SelectOption.module.scss'
import { useSelector, useDispatch } from 'react-redux'
import { updateSelectedServiceId, updateSelectedPeriodId, updateHiringChoice } from '../redux/actions'
import { useRef } from 'react'
import { packageMonthCoeff, packageYearCoeff, packageKwartalCoeff } from '../accessories/constants'

function SelectOption({options, reducerProp, number, children}) {

    // const selectedOptionId = useSelector(state=>state[reducerProp])

    const hiringChoices = useSelector(state=>state.hiringChoices)

    const [selectedOptionId, setSelectedOptionId] = useState(hiringChoices[number-1].choice !=='' ? hiringChoices[number-1].id : null)

    const dispatch = useDispatch()

    function clickOption(id){
        // switch(reducerProp){
        //     case 'selectedServiceId': return dispatch(updateSelectedServiceId(id))
        //     case 'selectedPeriodId': return dispatch(updateSelectedPeriodId(id))
        //     default: return
        // }
        console.log('option clicked')
        const coeff = id === "0" ? packageMonthCoeff :
            id === "1" ? packageKwartalCoeff : packageYearCoeff
        const updPrice = hiringChoices[0].price * coeff
        setSelectedOptionId(id)
        const option = options.find(option=>option.id===id)
        dispatch(updateHiringChoice({value: option.title, number, prop: "choice"}))
        dispatch(updateHiringChoice({value: option.id, number, prop: "id"}))
        dispatch(updateHiringChoice({value: true, number, prop: "isComplete"}))
        dispatch(updateHiringChoice({ number: 2, prop: "fullPrice", value: updPrice }))
        dispatch(updateHiringChoice({ number: 2, prop: "lengthCoeff", value: coeff }))
        dispatch(updateHiringChoice({ number: 2, prop: "price", value: hiringChoices[0].price }))
        // window.scrollTo(0, 150)
    }

    const $textDiv1 = useRef()
    const $textDiv2 = useRef()
    const $textDiv3 = useRef()

    useEffect(()=>{
        $textDiv1.current.innerHTML = options[0].text
        $textDiv2.current.innerHTML = options[1].text
        $textDiv3.current.innerHTML = options[2].text
    }, [])

    return (
        <div className={styles.selectOption}>
            <div className={styles.top}>
                {children}
            </div>
            <div className={styles.options}>
                {options.map((option, i)=>{
                    const ref= i===0? $textDiv1 : i===1? $textDiv2 : $textDiv3
                    return (
                    <div 
                        key={option.id} 
                        className={styles[selectedOptionId===option.id? "selectedOption": "option"]}
                        onClick={()=>clickOption(option.id)}
                    >
                        <div className={styles.optionTitle}>{option.title}</div>
                        <div className={styles.optionText} ref={ref}></div>
                    </div>
                )})}
            </div>
            
        </div>
    )
}

export default SelectOption
