import React, { useState, useEffect } from 'react'
import MenuIcon from '@material-ui/icons/Menu'
import CloseIcon from '@material-ui/icons/Close'

import styles from '../styles/Sidebar.module.scss'
import MenuContent from './menu-content'
import { setShowMenu } from '../redux/actions'
import { useSelector, useDispatch } from 'react-redux'

const Sidebar = ({color = 'white', auth}) => {

    // const [isOpen, setIsOpen] = useState(false)

    const dispatch = useDispatch()
    const [height, setHeight] = useState('100%')

    function clickMenu(e){
        console.log(e.target)
        dispatch(setShowMenu(showMenu===false? true: false))
        // dispatch(setShowMenu(true))
    }

    const showMenu = useSelector(state=>state.showMenu.show)

    const [languageId, setLanguageId] = useState("1")

    function clickLanguage(e){
        console.log(e)
        setLanguageId(e.target.dataset.id)
    }

    // useEffect(()=>{
    //     const pageHeight = document.documentElement.scrollHeight
    //     setHeight(`${pageHeight}px`)
    // }, [])

    return (
        // <div className={styles.sidebar} style={{height}}>
        <div className={styles.sidebar}>
            <div className={styles.menuIconsWrapper}>
                <div className={styles.menuIcons} onClick={clickMenu}>
                    {showMenu && <CloseIcon style={{fontSize: '70px', color}}/>}
                    {!showMenu && <MenuIcon style={{fontSize: '70px', color}}/>}
                </div>                    
            </div>

            <div className={styles.languageBlock}>
                <div className={styles.text}>Choose your language</div>

                <div className={styles.languages} onClick={clickLanguage}>
                    <div className={styles[languageId==="1"? 'active': 'language']} data-id='1'>PL</div>
                    /
                    <div className={styles[languageId==="2"? 'active': 'language']} data-id='2'>EN</div>
                    /
                    <div className={styles[languageId==="3"? 'active': 'language']} data-id='3'>UA</div>
                </div>
            </div>

            {showMenu && <MenuContent auth={auth}/>}

        </div>
    )
}

export default Sidebar
