import React from 'react'
import styles from '../../styles/Home.module.scss'
import { useSelector } from 'react-redux'
import Block from '../block'


const PanelBlockOne = () => {

    const language = useSelector(state=>state.language)

    return (
        <div className={styles.blockWrapper}>
            {language === 'pl' && 
                <Block className='block' showMore={false}>
                    <div className={styles.blockHeader}>
                        <div className={styles.blockHeaderFirst}>
                            Atrakcyjna Cena
                        </div>
                    </div>
                    <div className={styles.blockText}>
                        Oferujemy wynajem adresu wraz z pakietem usług w atrakcyjnej cenie już od  
                        <span className={styles.boldText}> 55&nbsp;PLN miesięcznie.</span>
                    </div>
                    <div className={styles.blockHeader}>
                        <div className={styles.blockHeaderFirst}>
                            Optymalizacja Kosztów
                        </div>
                    </div>
                    <div className={styles.blockText}>
                        Wirtualne biuro, czyli wirtualny adres, w&nbsp;porównaniu z wynajmem konwencjonalnego biura, umożliwia optymalizację kosztów prowadzenia firmy. Dzięki temu, że możesz skomponować pakiet usług dostosowany do swoich potrzeb, płacisz tylko za to, co jest Ci na prawdę potrzebne.
                    </div>
                </Block>
            }
            {language === 'ua' && 
                <Block className='block' showMore={false}>
                    <div className={styles.blockHeader}>
                        <div className={styles.blockHeaderFirst}>
                            Приваблива Ціна
                        </div>
                    </div>
                    <div className={styles.blockText}>
                        Ми пропонуємо оренду адреси з пакетом послуг за привабливою ціною від   
                        <span className={styles.boldText}> 55&nbsp;ЗЛОТИХ НА МІСЯЦЬ.</span>
                    </div>
                    <div className={styles.blockHeader}>
                        <div className={styles.blockHeaderFirst}>
                            Оптимізація Витрат
                        </div>
                    </div>
                    <div className={styles.blockText}>
                        Віртуальний офіс, тобто віртуальна адреса, дозволяє оптимізувати витрати на ведення бізнесу у порівнянні  з орендою звичайного офісу. Завдяки тому, що ви можете вибрати необхідний  пакет послуг з урахуванням ваших потреб, ви платите лише за те, що вам насправді необхідно.
                    </div>
                </Block>
            }
            {language === 'en' && 
                <Block className='block' showMore={false}>
                    <div className={styles.blockHeader}>
                        <div className={styles.blockHeaderFirst}>
                            Attractive Price
                        </div>
                    </div>
                    <div className={styles.blockText}>
                        We offer address lease with a package of services at an attractive price from   
                        <span className={styles.boldText}> 55&nbsp;PLN&nbsp;PER&nbsp;MONTH.</span>
                    </div>
                    <div className={styles.blockHeader}>
                        <div className={styles.blockHeaderFirst}>
                            Cost Optimisation
                        </div>
                    </div>
                    <div className={styles.blockText}>
                        In comparison to the lease of a traditional office, the virtual office (virtual address) allows you to optimise your business costs. With the possibility of composing a package of services customised to your needs, you pay only for what you really need.
                    </div>
                </Block>
            }
        </div>
    )
}

export default PanelBlockOne
