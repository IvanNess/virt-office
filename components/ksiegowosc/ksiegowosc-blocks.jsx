import React from 'react'
import styles from '../../styles/Ksiegowosc.module.scss'
import { useSelector } from 'react-redux'
import Block from '../block'


const KsiegowoscBlocks = () => {

    const language = useSelector(state=>state.language)

    return (
        <div className={styles.blocks}>
            {language === 'pl' && 
                <>
                    <Block className='blockMedium'>
                        <div className={styles.blockTitle}>
                            Prostota i wygoda, którą polubisz.
                        </div>
                        <div className={styles.blockText}><p>Szybko wystawisz fakturę, bez trudu wyliczysz 
                            podatki i rozliczysz się z ZUS. Prosto, wygodnie, 
                            bez zbędnych komplikacji.
                        </p></div>
                    </Block>
                    <Block className='blockMedium'>
                        <div className={styles.blockTitle}>
                            Wsparcie, gdy tego potrzebujesz.
                        </div>
                        <div className={styles.blockText}><p>
                            Podpowiadamy skuteczne rozwiązania i dzielimy się wiedzą. Zespół ekspertów jest zawsze do Twojej dyspozycji.
                        </p></div>
                    </Block>  
                    <Block className='blockMedium'>
                        <div className={styles.blockTitle}>
                            Kompleksowość, <br/>którą docenisz.
                        </div>
                        <div className={styles.blockText}><p>
                            Wszystko, co niezbędne w jednym miejscu, dostępne na każdym urządzeniu i o każdej porze. Twoja firma tam gdzie Ty!
                        </p></div>
                    </Block>  
                </> 
            }
            {language === 'ua' && 
                <>
                    <Block className='blockMedium'>
                        <div className={styles.blockTitle}>
                            Простота та комфорт вам сподобаються.
                        </div>
                        <div className={styles.blockText}><p>
                            Ви швидко виставите рахунок-фактуру, легко розрахуєте податки та розрахуєтесь з ZUS. Просто, зручно, без зайвих зусиль.
                        </p></div>
                    </Block>
                    <Block className='blockMedium'>
                        <div className={styles.blockTitle}>
                            Підтримка, коли вона вам потрібна.
                        </div>
                        <div className={styles.blockText}><p>
                            Ми пропонуємо ефективні рішення та ділимось знаннями. Команда наших експертів завжди у вашому розпорядженні.
                        </p></div>
                    </Block>  
                    <Block className='blockMedium'>
                        <div className={styles.blockTitle}>
                            Комплекс, який ви&nbsp;оціните.
                        </div>
                        <div className={styles.blockText}><p>
                            Все необхідне в одному місці, доступне на будь-якому пристрої та в будь-який час. Ваша компанія там - де ви знаходитесь!
                        </p></div>
                    </Block>  
                </> 
            }
        </div>
    )
}

export default KsiegowoscBlocks
