import React from 'react'

import styles from '../../styles/Hiring.module.scss'

function HiringChoice({idx, choice, name, isComplete}) {

    // console.log('choice', choice)

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
                        {name}
                    </div>
                    <div className={styles.hiringChoiceValues}>
                        {
                            typeof choice === 'string' &&
                            <div className={styles.hiringChoiceValue}>
                                {choice}
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
