import React from 'react'

import styles from '../../styles/Hiring.module.scss'

function HiringChoice({idx, choice, name, isComplete}) {

    // console.log('choice', choice)

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
                    </div>
                </div>
            }
        </div>
    )
}

export default HiringChoice
