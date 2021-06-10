import React from 'react'
import styles from '../../styles/Ksiegowosc.module.scss'
import { useSelector } from 'react-redux'
import Link from 'next/link'
import Billboard from '../billboard'

const KsiegowoscEnd = () => {

    const language = useSelector(state=>state.language)

    return (
        <>
            {language === 'pl' && 
                <Billboard noBackground={true}>
                    <div className={styles.noBackgroundBillboardText}>
                        Zawsze możesz liczyć na&nbsp;naszą pomoc. Zapewniamy stałe wsparcie merytoryczne oraz szybką pomoc techniczną.
                    </div>
                </Billboard>
            }
            {language === 'ua' && 
                <Billboard noBackground={true}>
                    <div className={styles.noBackgroundBillboardText}>
                        Ви завжди можете розраховувати на нашу підтримку та допомогу. Ми&nbsp;надаємо постійну підтримку та швидку технічну допомогу.
                    </div>
                </Billboard>
            }
        </>
    )
}

export default KsiegowoscEnd
