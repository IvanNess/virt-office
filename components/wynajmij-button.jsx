import React from 'react'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import styles from '../styles/WynajmijButton.module.scss'
import Link from 'next/link'
import { buttonNames } from '../accessories/constants'

const WynajmijButton = () => {

    const packages = useSelector(state=>state.packages)
    const language = useSelector(state=>state.language)
    const currentUser = useSelector(state=>state.currentUser)  

    const [wynajecieClassName, setWynajecieClassName] = useState('hideWynajecie')

    useEffect(()=>{
      if((packages && packages.length === 0) || currentUser===false){
        setWynajecieClassName('wynajecie')
      } else{
        setWynajecieClassName('hideWynajecie')
      }
    }, [packages, currentUser])
  

    return (
        <div className={styles.wynajmijButton}>
            <div className={styles[wynajecieClassName]}>
                {
                    wynajecieClassName==='wynajecie' && 
                    <Link href={`/${language}/wynajecie`}><a>{buttonNames[language]?.wynajecie}</a></Link>
                }
            </div>
        </div>
    )
}

export default WynajmijButton
