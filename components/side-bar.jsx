import React, { useState, useEffect } from 'react'
import MenuIcon from '@material-ui/icons/Menu'
import CloseIcon from '@material-ui/icons/Close'

import styles from '../styles/Sidebar.module.scss'
import MenuContent from './menu-content'
import { setShowMenu, setLanguage } from '../redux/actions'
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

    const language = useSelector(state=>state.language)

    function clickLanguage(e){
        console.log(e)
        dispatch(setLanguage(e.target.dataset.id))
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
                    <div className={styles[language==="pl"? 'active': 'language']} data-id='pl'>PL</div>
                    /
                    <div className={styles[language==="en"? 'active': 'language']} data-id='en'>EN</div>
                    /
                    <div className={styles[language==="ua"? 'active': 'language']} data-id='ua'>UA</div>
                </div>
            </div>

            {showMenu && <MenuContent auth={auth}/>}

        </div>
    )
}

export default Sidebar
