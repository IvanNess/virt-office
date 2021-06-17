import React from 'react'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import styles from '../styles/Sidebar.module.scss'

const LanguageChoice = () => {

    const router = useRouter()
    const language = useSelector(state=>state.language)

    function clickLanguage(e){
        console.log(e)
        const language = e.target.dataset.id
        const pathname = router.query?.pagename ? `/${router.query.pagename}` : `${router.pathname==='/' ? '/home' : router.pathname}`
        console.log(`/${language}${pathname}`)
        localStorage.setItem('voLanguage', language)
        // dispatch(setLanguage(e.target.dataset.id))
        router.push(`/${language}${pathname}`)
    }

    return (
        <div className={styles.languages} onClick={clickLanguage}>
            <div className={styles[language==="pl"? 'active': 'language']} data-id='pl'>PL</div>
            /
            <div className={styles[language==="en"? 'active': 'language']} data-id='en'>EN</div>
            /
            <div className={styles[language==="ua"? 'active': 'language']} data-id='ua'>UA</div>
        </div>
    )
}

export default LanguageChoice
