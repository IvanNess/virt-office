import React from 'react'
import styles from '../../styles/Home.module.scss'
import { useSelector } from 'react-redux'
import Block from '../block'


const PanelBlockThree = () => {

    const language = useSelector(state=>state.language)

    return (
        <div className={styles.blockWrapper}>
            {language === 'pl' && 
                <Block className='block' showMore={false}>
                    <div className={styles.blockHeader}>
                        <div className={styles.blockHeaderFirst}>
                            Możliwość Wykonania Wszystkich Czynności Zdalnie
                        </div>
                    </div>
                    <div className={styles.blockText}>
                        Wszystkie formalności związane z wynajmem biura, czy sali konferencyjnej i korzystaniem z naszych pozostałych usług możesz zrealizować zdalnie. 
                    </div>
                    <div className={styles.blockHeader}>
                        <div className={styles.blockHeaderFirst}>
                            Minimum Formalności
                        </div>
                    </div>
                    <div className={styles.blockText}>
                        Proces zawarcia umowy z nami zajmuje kilka minut, ponieważ szanujemy Twój czas i pieniądze. Poprzez stronę internetową lub aplikację korzystasz ze swojego wirtualnego biura z dowolnego miejsca i w dowolnym czasie.
                    </div>
              </Block>     
            }
            {language === 'ua' && 
                <Block className='block' showMore={false}>
                    <div className={styles.blockHeader}>
                        <div className={styles.blockHeaderFirst}>
                            Всі Заходи Можна організовувати Віддалено
                        </div>
                    </div>
                    <div className={styles.blockText}>
                        Усі формальності, які пов’язані з орендою офісу чи конференц-залу та використанням інших додаткових послуг, можна здійснювати віддалено.
                    </div>
                    <div className={styles.blockHeader}>
                        <div className={styles.blockHeaderFirst}>
                            Мінімальні Формальності
                        </div>
                    </div>
                    <div className={styles.blockText}>
                        Процес укладення контракту з нами займає кілька хвилин, оскільки ми поважаємо ваш час та гроші. Через веб-сайт або додаток ви можете користуватися своїм віртуальним офісом де завгодно та в будь-який час.
                    </div>
              </Block>     
            }
        </div>
    )
}

export default PanelBlockThree
