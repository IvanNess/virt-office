import React from 'react'
import styles from '../../styles/Ksiegowosc.module.scss'
import { useSelector } from 'react-redux'

const Digits = () => {

    const language = useSelector(state=>state.language)

    return (
        <>
            {language === 'pl' && 
                <div className={styles.records}>
                    <div className={styles.record}>
                        <div className={styles.top}>390&nbsp;tyś</div>
                        <div className={styles.bottom}>zarejestrowanych użytkowników</div>
                    </div>
                    <div className={styles.record}>
                        <div className={styles.top}>15&nbsp;lat</div>
                        <div className={styles.bottom}>na&nbsp;rynku księgowości</div>
                    </div>
                    <div className={styles.record}>
                        <div className={styles.top}>3&nbsp;mln.</div>
                        <div className={styles.bottom}>wysłanych e&#8209;deklaracji</div>
                    </div>
                    <div className={styles.record}>
                        <div className={styles.top}>62&nbsp;mln.</div>
                        <div className={styles.bottom}>wystawionych faktur</div>
                    </div>
                </div>
            }
            {language === 'ua' && 
                <div className={styles.uarecords}>
                    <div className={styles.record}>
                        <div className={styles.top}>390&nbsp;тисяч</div>
                        <div className={styles.bottom}>зареєстрованих користувачів</div>
                    </div>
                    <div className={styles.record}>
                        <div className={styles.top}>15&nbsp;років</div>
                        <div className={styles.bottom}>na&nbsp;на ринку бухгалтерського обліку</div>
                    </div>
                    <div className={styles.record}>
                        <div className={styles.top}>3&nbsp;мільйони</div>
                        <div className={styles.bottom}>надісланих електроних декларацій</div>
                    </div>
                    <div className={styles.record}>
                        <div className={styles.top}>62&nbsp;мільйони</div>
                        <div className={styles.bottom}>Виставлених рахунків-фактур</div>
                    </div>
                </div>
            }
        </>
    )
}

export default Digits
