import React from 'react'

import styles from '../styles/Ksiegowosc.module.scss'
import Billboard from '../components/billboard'
import Header from '../components/header'
import Sidebar from '../components/side-bar'
import Block from '../components/block'

function Ksiegowosc() {
    const Hyphen = ()=> <span className={styles.hyphen}>&mdash;&mdash;&mdash;&mdash;&mdash;</span>

    return (
        <div className={styles.ksiegowosc}>
            <Sidebar/>

            <Billboard>
                <Header/>
                <div className={styles.headerTitle}>
                    On-linowa księgowość z<span className={styles.headerBoldFont}> wfirma.pl</span>
                </div>
                <div className={styles.headerText}>
                    Zarządzaj swoim biznesem z każdego miejsca o dowolnej porze
                </div>
                <form className={styles.headerForm}>
                    <input className={styles.buttonInput} type="button" value="Wynajmij biuro"/>
                </form>
            </Billboard>
            
            <div className={styles.title}>
                Jeden system,<div className={styles.boldFont}>wiele możliwości</div>
            </div>
            <div className={styles.smallText}>
                Prowadź księgowość online i zyskaj niezależność w zarządzaniu firmą!
            </div>

            <div className={styles.blocks}>
                <Block className='blockMedium'>
                    <div className={styles.blockTitleTwo}>
                        Menedżer sprzedaży
                    </div>
                    <div className={styles.blockTextTwo}><Hyphen/><div className={styles.afterHyphen}>Fakturowanie</div></div>
                    <div className={styles.blockTextTwo}><Hyphen/><div className={styles.afterHyphen}>Magazyn</div></div>
                    <div className={styles.blockTextTwo}><Hyphen/><div className={styles.afterHyphen}>CRM</div></div>
                    <div className={styles.blockTextTwo}><Hyphen/><div className={styles.afterHyphen}>e-Commerce</div></div>  
                </Block>
                <Block className='blockMedium'>
                    <div className={styles.blockTitleTwo}>
                        Kadry i płace
                    </div>
                    <div className={styles.blockTextTwo}><Hyphen/><div className={styles.afterHyphen}>Generator dokumentów</div></div>
                    <div className={styles.blockTextTwo}><Hyphen/><div className={styles.afterHyphen}>Integracje z e-ZUS i MF</div></div>
                    <div className={styles.blockTextTwo}><Hyphen/><div className={styles.afterHyphen}>Ewidencja czasu pracy</div></div>
                    <div className={styles.blockTextTwo}><Hyphen/><div className={styles.afterHyphen}>Elektroniczne akta osobowe</div></div> 
                </Block>
                <Block className='blockMedium'>
                    <div className={styles.blockTitleTwo}>
                        Księgowość online
                    </div>
                    <div className={styles.blockTextTwo}><Hyphen/><div className={styles.afterHyphen}>KPiR, Ryczałt, VAT</div></div>
                    <div className={styles.blockTextTwo}><Hyphen/><div className={styles.afterHyphen}>JPK, e-Deklaracje</div></div>
                    <div className={styles.blockTextTwo}><Hyphen/><div className={styles.afterHyphen}>Kasa / Bank</div></div>
                    <div className={styles.blockTextTwo}><Hyphen/><div className={styles.afterHyphen}>Środki trwałe</div></div> 
                </Block>   
            </div>

            <div className={styles.secondTitle}>
                <div className={styles.title}>
                    <span className={styles.boldFont}>wFirma</span> w liczbach — Postaw na doświadczenie
                </div>
            </div>

            <div className={styles.records}>
                <div className={styles.record}>
                    <div className={styles.top}>215 tyś</div>
                    <div className={styles.bottom}>zarejestrowanych użytkowników</div>
                </div>
                <div className={styles.record}>
                    <div className={styles.top}>14 lat</div>
                    <div className={styles.bottom}>na rynku księgowości</div>
                </div>
                <div className={styles.record}>
                    <div className={styles.top}>1 mln.</div>
                    <div className={styles.bottom}>wysłanych e-deklaracji</div>
                </div>
                <div className={styles.record}>
                    <div className={styles.top}>41 mln.</div>
                    <div className={styles.bottom}>wystawionych faktur</div>
                </div>
            </div>

            <Billboard>
                <div className={styles.text}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin at ex bibendum, lacinia leo a, faucibus mauris. Quisque quis libero risus. Etiam at vestibulum lorem. Quisque purus ante, semper et semper id, rhoncus a felis. Nulla quam enim, ultrices ac ipsum id, imperdiet venenatis urna.
                </div>
            </Billboard>

            <div className={styles.thirdTitle}>
                <div className={styles.title}>
                    Poznaj opinie użytkowników, którzy nam <span className={styles.boldFont}>zaufali</span> 
                </div>
            </div>

            <div className={styles.secondBlocks}>
                <div className={styles.blocks}>
                    <Block className='block' showButton={false}>
                        <div className={styles.quotes}>„</div>
                        <div className={styles.wrapper}>
                            <div className={styles.blockText}>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin at ex bibendum, lacinia leo a, faucibus mauris. Quisque quis libero risus. Etiam at vestibulum lorem. Quisque purus ante, semper et semper id, rhoncus a felis. Nulla quam enim, ultrices ac ipsum id, imperdiet venenatis urna.
                            </div> 
                            <div className={styles.firm}>Imię / firma</div>
                        </div>
                    </Block>
                    <Block className='block' showButton={false}>
                        <div className={styles.quotes}>„</div>
                        <div className={styles.wrapper}>
                            <div className={styles.blockText}>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin at ex bibendum, lacinia leo a, faucibus mauris. Quisque quis libero risus. Etiam at vestibulum lorem. Quisque purus ante, semper et semper id, rhoncus a felis. Nulla quam enim, ultrices ac ipsum id, imperdiet venenatis urna.
                            </div> 
                            <div className={styles.firm}>Imię / firma</div>
                        </div>
                    </Block>
                    <Block className='block' showButton={false}>
                        <div className={styles.quotes}>„</div>
                        <div className={styles.wrapper}>
                            <div className={styles.blockText}>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin at ex bibendum, lacinia leo a, faucibus mauris. Quisque quis libero risus. Etiam at vestibulum lorem. Quisque purus ante, semper et semper id, rhoncus a felis. Nulla quam enim, ultrices ac ipsum id, imperdiet venenatis urna.
                            </div> 
                            <div className={styles.firm}>Imię / firma</div>
                        </div>
                    </Block>      
                </div>
            </div>
            

        </div>
    )
}

export default Ksiegowosc
