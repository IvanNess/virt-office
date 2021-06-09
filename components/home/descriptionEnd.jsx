import React from 'react'
import styles from '../../styles/Home.module.scss'
import { useSelector } from 'react-redux'


const DescriptionEnd = () => {

    const language = useSelector(state=>state.language)

    return (
        <div className={styles.smallText}>
            {language === 'pl' && 
                <>
                    dzięki skorzystaniu z naszej oferty wirtualnego adresu lub wynajmu sali konferencyjnej możesz załatwić wszystkie formalności on-line lub po wcześniejszym umówieniu się w naszej siedzibie.
                </>
            }
            {language === 'ua' && 
                <>
                    використовуючи нашу пропозицію оренди віртуальної адреси або орендуючи конференц-зал, ви можете виконати всі формальності в інтернеті або за попереднім записом у нашому офісі.
                </>
            }
            {language === 'en' && 
                <>
                    by using our virtual address or conference room lease offer, you can arrange all formalities online or upon prior appointment in our office.                </>
            }
        </div>
    )
}

export default DescriptionEnd
