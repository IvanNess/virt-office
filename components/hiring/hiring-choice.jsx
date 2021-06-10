import React from 'react'

import styles from '../../styles/Hiring.module.scss'
import { phrases } from '../../accessories/constants'

function HiringChoice({idx, choice, name, isComplete, language}) {

    // console.log('choice', choice)

    const langName = 
        idx===0 ? phrases[language]?.selectPackage: 
        idx===1 ? phrases[language]?.selectPeriod: ''

    const langChoice = 
        idx===0 && choice==='Wirtualny adres' ? phrases[language]?.cennikTitleOne :
        idx===0 && choice==='Optymalny pakiet' ? phrases[language]?.cennikTitleTwo :
        idx===0 && choice==='Profesjonalne biuro' ? phrases[language]?.cennikTitleThree :
        idx===1 && choice==='Miesiąc' ? phrases[language]?.month :
        idx===1 && choice==='Kwartał' ? phrases[language]?.kwartal :
        idx===1 && choice==='Rok' ? phrases[language]?.year : ''

    let choices = []
    if(typeof choice !== 'string'){
        for (const key in choice) {
            if (choice.hasOwnProperty(key)) {
                choices = [...choices,
                    {
                        prop: key,
                        value: choice[key]
                    }
                ]
            }
        }
    }

    return (
        <div className={styles.hiringChoice}>
            {isComplete &&
                <div className={styles.hiringChoiceProps}>
                    <div className={styles.hiringChoiceTitle}>
                        {langName}
                    </div>
                    <div className={styles.hiringChoiceValues}>
                        {
                            typeof choice === 'string' &&
                            <div className={styles.hiringChoiceValue}>
                                {langChoice}
                            </div>
                        }
                        {
                            typeof choice !== 'string' && (
                                choices.map(choice=>
                                    <div className={styles.hiringChoiceValue}>
                                        {choice.value}
                                    </div>    
                                )
                            )
                        }
                    </div>
                </div>
            }
        </div>
    )
}

export default HiringChoice
