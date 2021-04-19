import React, { useState } from 'react'
import styles from '../styles/SelectOption.module.scss'
import { useSelector, useDispatch } from 'react-redux'
import { updateSelectedServiceId, updateSelectedPeriodId, updateHiringChoice } from '../redux/actions'

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
        const coeff = id === "0" ? 1 :
            id === "1" ? 2.5 : 9
        const updPrice = hiringChoices[0].price * coeff
        setSelectedOptionId(id)
        const option = options.find(option=>option.id===id)
        dispatch(updateHiringChoice({value: option.title, number, prop: "choice"}))
        dispatch(updateHiringChoice({value: option.id, number, prop: "id"}))
        dispatch(updateHiringChoice({value: true, number, prop: "isComplete"}))
        dispatch(updateHiringChoice({ number: 2, prop: "fullPrice", updPrice }))
        dispatch(updateHiringChoice({ number: 2, prop: "lengthCoeff", coeff }))
        dispatch(updateHiringChoice({ number: 2, prop: "price", value: hiringChoices[0].price }))
        // window.scrollTo(0, 150)
    }

    return (
        <div className={styles.selectOption}>
            <div className={styles.top}>
                {children}
            </div>
            <div className={styles.options}>
                {options.map(option=>(
                    <div 
                        key={option.id} 
                        className={styles[selectedOptionId===option.id? "selectedOption": "option"]}
                        onClick={()=>clickOption(option.id)}
                    >
                        <div className={styles.optionTitle}>{option.title}</div>
                        <div className={styles.optionText}>{option.text}</div>
                    </div>
                ))}
            </div>
            
        </div>
    )
}

export default SelectOption
