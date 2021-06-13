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
            {language === 'en' && 
                <>
                    <Block className='blockMedium'>
                        <div className={styles.blockTitle} style={{maxWidth: '360px'}}>
                            The simplicity and comfort that you will like.
                        </div>
                        <div className={styles.blockText}><p>
                            You will quickly issue an invoice, easily calculate taxes and settle payments with ZUS. Simple, comfortable and uncomplicated.
                        </p></div>
                    </Block>
                    <Block className='blockMedium'>
                        <div className={styles.blockTitle}>
                            Support whenever<br/> you need it    
                        </div>
                        <div className={styles.blockText}><p>
                            We suggest effective solutions and share our knowledge. Our team of experts is always at your disposal.                        </p></div>
                    </Block>  
                    <Block className='blockMedium'>
                        <div className={styles.blockTitle} style={{maxWidth: '350px'}}>
                            The comprehensiveness that you will appreciate.
                        </div>
                        <div className={styles.blockText}><p>
                            Everything you need in one place, available on every device and at any time. Your company is wherever you are!
                        </p></div>
                    </Block>  
                </> 
            }
        </div>
    )
}

export default KsiegowoscBlocks
