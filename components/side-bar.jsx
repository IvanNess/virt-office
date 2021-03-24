import React, { useState } from 'react'
import MenuIcon from '@material-ui/icons/Menu'
import CloseIcon from '@material-ui/icons/Close'

import styles from '../styles/Sidebar.module.scss'
import MenuContent from './menu-content'
import { setShowMenu } from '../redux/actions'
import { useSelector, useDispatch } from 'react-redux'

const Sidebar = ({color = 'white'}) => {

    // const [isOpen, setIsOpen] = useState(false)

    const dispatch = useDispatch()

    function clickMenu(){
        dispatch(setShowMenu(showMenu===false? true: false))
    }

    const showMenu = useSelector(state=>state.showMenu.show)

    const [languageId, setLanguageId] = useState("1")

    function clickLanguage(e){
        console.log(e)
        setLanguageId(e.target.dataset.id)
    }

    return (
        <div className={styles.sidebar}>
            <div className={styles.menuIconsWrapper}>
                <div className={styles.menuIcons} onClick={clickMenu}>
                    {showMenu && <CloseIcon style={{fontSize: '70px', color}}/>}
                    {!showMenu && <MenuIcon style={{fontSize: '70px', color}}/>}
                </div>                    
            </div>

            {showMenu && <MenuContent/>}

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
        </div>
    )
}

export default Sidebar
