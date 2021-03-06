import React from 'react'
import styles from '../../styles/Home.module.scss'
import { useSelector } from 'react-redux'
import Link from 'next/link'


const EndPanel = () => {

    const language = useSelector(state=>state.language)

    return (
        <>
            {language === 'pl' && 
                <div className={styles.blockLargeInner}>
                    <div className={styles.left}>
                        <div className={styles.blockHeader}>
                            <div className={styles.blockHeaderFirst}>
                                Płać tylko za wykorzystane usługi
                            </div>
                        </div>
                        <div className={styles.blockText}>
                            <span>
                                Wirtualny adres Twojej firmy wynajęty w <Link href='/'><a>virtoffice.pl</a></Link> daje Ci możliwość obsługi korespondencji, korzystania z sali konferencyjnej, optymalnych kosztów księgowości i archiwizacji dokumentów. Wszystkie usługi związane z wynajmem adresu możesz mieć dostosowane do swoich indywidulanych potrzeb. Umożliwi to osiągnięcie optymalnych kosztów stałych związanych z prowadzoną przez Ciebie działalnością
                            </span>
                        </div>
                    </div>
                    <div className={styles.right}>
                        <div className={styles.blockHeader}>
                            <div className={styles.blockHeaderFirst}>
                                Sala konferencyjna
                            </div>
                        </div>
                        <div className={styles.blockText}>
                            <span>
                                Wynajem w pełni zautomatyzowanego i świetnie wyposażonym wnętrza daje możliwość organizowania spotkań biznesowych. Ekran, rzutnik, stół konferencyjny, strefa chill czy choćby zaplecze sanitarno-kuchenne daje pełny komfort rozmów. Dodatkowo sala na czas spotkania jest oznakowana logiem Twojej firmy, a wszystkie formalności możesz załatwić online.
                            </span>
                        </div>   
                    </div>
                </div>   
            }
            {language === 'ua' && 
                <div className={styles.blockLargeInner}>
                    <div className={styles.left}>
                        <div className={styles.blockHeader}>
                            <div className={styles.blockHeaderFirst}>
                                Сплачуйте Лише за Послуги, Якими Ви Користуєтесь
                            </div>
                        </div>
                        <div className={styles.blockText}>
                            <span>
                                віртуальна адреса вашої компанії, орендована на <Link href='/'><a>virtoffice.pl</a></Link>, дає вам можливість вести ділове листування, користуватися конференц-залом, оптимізувати витрати на бухгалтерський облік та архівування документів. Ви можете отримати всі послуги, пов’язані з орендою адреси, з урахуванням ваших індивідуальних потреб. Це дає вам можливість оптимізувати систематичні витрати пов’язані з вашим бізнесом.                        
                            </span>
                        </div>
                    </div>
                    <div className={styles.right}>
                        <div className={styles.blockHeader}>
                            <div className={styles.blockHeaderFirst}>
                                Кімната Для Переговорів
                            </div>
                        </div>
                        <div className={styles.blockText}>
                            <span>
                                оренда конференц-залу дає можливість ділових зустрічей в повністю автоматизованому та добре обладнаному інтер’єрі. Екран, проектор, конференц-стіл, зона відпочинку чи навіть санітарно-технічні та кухонні приміщення забезпечують повний комфорт під час розмов. Крім того, кімната позначена логотипом вашої компанії на час зустрічі, і ви можете домовитись про всі формальності в режимі онлайн.                        
                            </span>
                        </div>   
                    </div>
                </div>   
            }
            {language === 'en' && 
                <div className={styles.blockLargeInner}>
                    <div className={styles.left}>
                        <div className={styles.blockHeader}>
                            <div className={styles.blockHeaderFirst}>
                                Pay Only For Used Services
                            </div>
                        </div>
                        <div className={styles.blockText}>
                            <span>
                                The virtual address of your company leased in <Link href='/'><a>virtoffice.pl</a></Link> allows you to handle correspondence, use the conference room, optimise accounting costs and archive documents. All address lease services can be adapted to your particular needs. This will enable you to run your business at relatively low and optimum fixed costs.
                            </span>
                        </div>
                    </div>
                    <div className={styles.right}>
                        <div className={styles.blockHeader}>
                            <div className={styles.blockHeaderFirst}>
                                Conference Room
                            </div>
                        </div>
                        <div className={styles.blockText}>
                            <span>
                                The lease of a conference room gives you an opportunity to hold business meetings in a fully automated and well-equipped interior. The screen, the projector, the conference table, the chillout zone and sanitary and kitchen facilities ensure the full comfort of your negotiations. In addition, the room will be marked with the logo of your company for the period of the meeting, and you can arrange all formalities online.
                            </span>
                        </div>   
                    </div>
                </div>   
            }
        </>
    )
}

export default EndPanel
