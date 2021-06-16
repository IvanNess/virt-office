import React from 'react'
import styles from '../../styles/Home.module.scss'
import { useSelector } from 'react-redux'

const RozliczeniaDescription = () => {

    const language = useSelector(state=>state.language)

    return (
        <>
            {language === 'pl' && 
                <>
                    Poniżej możesz sprawdzić swoje płatności i faktury za wynajem adresu rejestracyjnego firmy wraz z profesjonalną obsługą korespondencji oraz archiwizacją dokumentów  
                    - <span className={styles.smallTextBold}>WKRÓTCE</span> dostęp do ogólnopolskiej sieci sal  konferencyjnych.
                </>
            }
            {language === 'ua' && 
                <>
                    Poniżej możesz sprawdzić swoje płatności i faktury za wynajem adresu rejestracyjnego firmy wraz z profesjonalną obsługą korespondencji oraz archiwizacją dokumentów  
                    - <span className={styles.smallTextBold}>WKRÓTCE</span> dostęp do ogólnopolskiej sieci sal  konferencyjnych.
                </>
            }           
            {language === 'en' && 
                <>
                    Poniżej możesz sprawdzić swoje płatności i faktury za wynajem adresu rejestracyjnego firmy wraz z profesjonalną obsługą korespondencji oraz archiwizacją dokumentów  
                    - <span className={styles.smallTextBold}>WKRÓTCE</span> dostęp do ogólnopolskiej sieci sal  konferencyjnych.
                </>
            }        
        </>
    )
}

export default RozliczeniaDescription
