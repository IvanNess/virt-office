import React from 'react'
import styles from '../../styles/Home.module.scss'
import { useSelector } from 'react-redux'
import Block from '../block'


const PanelBlockTwo = () => {

    const language = useSelector(state=>state.language)

    return (
        <div className={styles.blockWrapper}>
            {language === 'pl' && 
                <Block className='block' showMore={false}>
                    <div className={styles.blockHeader}>
                        <div className={styles.blockHeaderFirst}>
                            Kompleksowa Oferta
                        </div>
                    </div>
                    <div className={styles.blockText}>
                        Nasza oferta jest kompleksowa i dostosowana do rzeczywistych potrzeb przedsiębiorcy. 
                    </div>
                    <div className={styles.blockHeader}>
                        <div className={styles.blockHeaderFirst}>
                            Obsługa Korespondencji
                        </div>
                    </div>
                    <div className={styles.blockText}>
                        Oprócz adresu uzyskujesz obsługę korespondencji, archiwizację dokumentów, dostęp do sali konferencyjnej umożliwiający organizację spotkań z klientami. We współpracy z naszym partnerem wfirma.pl oferujemy również usługi księgowe.
                    </div>
                </Block>
            }
            {language === 'ua' && 
                <Block className='block' showMore={false}>
                    <div className={styles.blockHeader}>
                        <div className={styles.blockHeaderFirst}>
                            Комплексна Пропозиція
                        </div>
                    </div>
                    <div className={styles.blockText}>
                        Наша пропозиція побудована та адаптована до реальних потреб підприємця.
                    </div>
                    <div className={styles.blockHeader}>
                        <div className={styles.blockHeaderFirst}>
                            Обробка кореспонденції
                        </div>
                    </div>
                    <div className={styles.blockText}>
                        Окрім юридичної адреси, ви отримуєте послуги: обробки кореспонденції, архівування офіційних листів та документів, доступ до конференц-залу, який дозволяє організовувати зустрічі з клієнтами. У співпраці з нашим партнером wfirma.pl ми також пропонуємо бухгалтерські послуги.
                    </div>
                </Block>
            }
            {language === 'en' && 
                <Block className='block' showMore={false}>
                    <div className={styles.blockHeader}>
                        <div className={styles.blockHeaderFirst}>
                            Comprehensive Offer
                        </div>
                    </div>
                    <div className={styles.blockText}>
                        Our offer is comprehensive and adapted to the entrepreneur’s actual needs.
                    </div>
                    <div className={styles.blockHeader}>
                        <div className={styles.blockHeaderFirst}>
                            Correspondence Handling
                        </div>
                    </div>
                    <div className={styles.blockText}>
                        Apart from the address, you obtain correspondence handling and document archiving services and access to a conference room that will allow you to organise meetings with customers. We offer also accounting services in co-operation with our partner wfirma.pl.
                    </div>
                </Block>
            }
        </div>
    )
}

export default PanelBlockTwo
