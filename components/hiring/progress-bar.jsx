import React from 'react'

import styles from '../../styles/Hiring.module.scss'
import { useSelector, useDispatch } from 'react-redux'
import { setHiringChoiceNumber } from '../../redux/actions'

function ProgressBar() {

    const hiringChoiceNumber = useSelector(state=> state.hiringChoiceNumber)
    const hiringChoices = useSelector(state=> state.hiringChoices)

    const dispatch = useDispatch()

    const choiceNumbers = [ 1, 2, 3, 4, 5 ]

    function clicked(e){
        const number = Number(e.target.dataset.number)
        if(!number)
            return
        dispatch(setHiringChoiceNumber(number))
    }

    return (
        <div className={styles.progressBarWrapper}>
             {/* <div className={styles.connectBarWrapper}>
                <div className={styles.connectBar}></div>
            </div> */}
            
            <div className={styles.progressBar} onClick={clicked}>
                {choiceNumbers.map(number=>{
                    console.log(!hiringChoices[number-1] || (!hiringChoices[number-1].isComplete && hiringChoiceNumber !== number))
                    return(
                        <div 
                            className={ (!hiringChoices[number-1] || !hiringChoices[number-1].isComplete) && hiringChoiceNumber !== number
                                ? styles.progressBarNumber
                                : styles.progressBarCompleteNumber }
                            data-number={number}
                            key={number}
                        >
                            <p data-number={number}>{number}</p>
                        </div> 
                    )
                    
                })}
            </div> 
        </div>
        
    )
}

export default ProgressBar
