import React from 'react'
import styles from "../styles/Wynajecie.module.scss"
import { useSelector, useDispatch } from 'react-redux'
import SelectOption from '../components/select-option'
import { services, periods } from '../accessories/options'
import Rightbar from '../components/hiring/rightbar'
import Header from '../components/header'
import { updateHiringChoice, setHiringChoiceNumber } from '../redux/actions'
import OfficeSearch from '../components/office-search'
import Link from 'next/link'


function Wynajecie() {

    const hiringChoiceNumber = useSelector(state=>state.hiringChoiceNumber)
    const hiringChoices = useSelector(state=>state.hiringChoices)

    const dispatch = useDispatch()

    function confirm(){
        dispatch(updateHiringChoice({number: hiringChoiceNumber, value: true, prop: "isComplete"}))
        dispatch(setHiringChoiceNumber(hiringChoiceNumber+1))
    }

    return (
        <div className={styles.wynajecie}>
            <div className={styles.selectOptionWithBtn}>
                <div className={styles.wynajecieHeader}>
                    <div className={styles.wynajecieLogo}>
                        <Link href='/'><a>LO/GO</a></Link> 
                    </div>
                </div>
                {hiringChoiceNumber===1 && 
                    <SelectOption options={services} reducerProp="selectedServiceId" number={hiringChoiceNumber}>
                        <div className={styles.servicesTitle}>1. WYBÓR USŁUGI
                            <span className={styles.boldFont}> BIURA WIRTUALNEGO</span>
                        </div>
                    </SelectOption>
                }
                {hiringChoiceNumber===2 && 
                    <OfficeSearch hiringChoiceNumber={hiringChoiceNumber}/>
                }
                {hiringChoiceNumber===3 && 
                    <SelectOption options={periods} reducerProp="selectedServiceId" number={hiringChoiceNumber}>
                        <div className={styles.servicesTitle}>3. WYBIERZ 
                            <span className={styles.boldFont}> CZAS TRWANIA UMOWY</span>
                        </div>
                    </SelectOption>
                }
                {hiringChoices[hiringChoiceNumber-1].choice !== '' &&
                    <div 
                        className={hiringChoiceNumber!==2? styles.confirmSelectOptionWrapper: styles.officeSearchConfirmWrapper}
                    >
                        <button 
                            className={hiringChoiceNumber!==2? styles.confirmSelectOption: styles.officeSearchConfirm} 
                            onClick={confirm}
                        >
                            Dalej
                        </button>
                    </div>
                }
            </div>
            <Rightbar/>
        </div>
    )
}

export default Wynajecie
