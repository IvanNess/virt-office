import React, { useState, useEffect } from 'react'
import { Checkbox } from 'antd'
import styles from '../styles/UserPackageChoices.module.scss'
import initCheckboxValues from '../accessories/user-package-choices'

const UserPackageChoices = () => {

    const [checkBoxes, setCheckboxes] = useState(initCheckboxValues)

    const checkChanged = (value, idx)=>{
        console.log(value, idx)
        const checked = value.target.checked
        const upd = [...checkBoxes]
        upd[idx].checked = checked
        setCheckboxes(upd)
    }

    useEffect(()=>{
        console.log(checkBoxes)
    }, [checkBoxes])

    return (
        <div className={styles.userPackageChoices}>
            <div className={styles.servicesTitle}>skorzystaj również z
                <span className={styles.boldFont}> twojego pakietu!</span>
            </div>
            <p>Wybierz potrzebne elementy do prowadzenia działalności</p>
            {checkBoxes.map(({idx, text})=>(
                <Checkbox onChange={(value)=>{checkChanged(value, idx)}} key={idx} defaultChecked={false}>
                    {text}
                </Checkbox>
            ))}
         </div>
    )
}

export default UserPackageChoices
