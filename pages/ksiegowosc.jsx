import React from 'react'

import styles from '../styles/Ksiegowosc.module.scss'
import Billboard from '../components/billboard'
import Header from '../components/header'
import Sidebar from '../components/side-bar'
import Block from '../components/block'
import Link from 'next/link'
import Footer from '../components/footer'
import WynajmijButton from '../components/wynajmij-button'
import Line from '../components/line'

function Ksiegowosc({auth}) {
    const Hyphen = ()=> <span className={styles.hyphen}>&mdash;&mdash;&mdash;&mdash;&mdash;</span>

    return (
        <div className={styles.ksiegowosc}>
            <Sidebar auth={auth}/>

            <Line/>

            <Billboard>
                <Header/>
                <div className={styles.headerTitle}>
                    {/* Księgowość online <span className={styles.headerBoldFont}> dla Ciebie</span> */}
                    Siła połączonych ofert <br/>
                    Dla klientów wynajmujących adres od&nbsp;virtoffice.pl 
                    <div className={styles.headerBoldFont}>ROK DARMOWEGO DOSTĘPU DO SERWISU WFIRMA</div>
                </div>
                <div className={styles.headerText}>
                    {/* Wystawiaj faktury, wyliczaj podatki i rozliczaj się z ZUS */}
                    Księgowość zarówno on-line jak i&nbsp;konwencjonalna. 
                    <br/>
                    Wybierz najlepsze rozwiązanie dla Ciebie, my chętnie doradzimy.
                    {/* Wystawiaj faktury wyliczaj podatki i rozliczaj się z ZUS dzięki księgowości on&#8209;line albo zleć to profesjonalnym księgowym */}
                    <br/>
                    Wystawiaj faktury, wyliczaj podatki i rozliczaj się z ZUS dzięki księgowości on&#8209;line albo zleć to <span className={styles.headerTextBoldFont}>profesjonalnym księgowym</span>. Chętnie doradzimy Ci w wyborze rozwiązania najlepiej dopasowanego do Twoich potrzeb.
                </div>
                {/* <div className={styles.linkButtonWrapper}>
                    <div className={styles.linkButton}>
                        <Link href='/wynajecie'><a>Wynajmij adres</a></Link>
                    </div> 
                </div> */}
                <WynajmijButton/>
            </Billboard>
            
            <div style={{margin: 'auto', maxWidth: '1440px'}}>

                <div className={styles.title}>
                    Ponad <span className={styles.boldFont}> 700 nowych </span>przedsiębiorców wybiera wFirmę każdego tygodnia
                </div>
                {/* <div className={styles.smallText}>
                    Prowadź księgowość online i zyskaj niezależność w zarządzaniu firmą!
                </div> */}

                <div className={styles.blocks}>
                    <Block className='blockMedium'>
                        <div className={styles.blockTitle}>
                            Prostota i wygoda, którą polubisz.
                        </div>
                        {/* <div className={styles.blockText}><Hyphen/><div className={styles.afterHyphen}>Fakturowanie</div></div>
                        <div className={styles.blockText}><Hyphen/><div className={styles.afterHyphen}>Magazyn</div></div>
                        <div className={styles.blockText}><Hyphen/><div className={styles.afterHyphen}>CRM</div></div>
                        <div className={styles.blockText}><Hyphen/><div className={styles.afterHyphen}>e-Commerce</div></div>   */}
                        <div className={styles.blockText}><p>Szybko wystawisz fakturę, bez trudu wyliczysz 
                            podatki i rozliczysz się z ZUS. Prosto, wygodnie, 
                            bez zbędnych komplikacji.
                        </p></div>
                    </Block>
                    <Block className='blockMedium'>
                        <div className={styles.blockTitle}>
                            Wsparcie, gdy tego potrzebujesz.
                        </div>
                        <div className={styles.blockText}><p>Podpowiadamy skuteczne rozwiązania i dzielimy się wiedzą. Zespół ekspertów jest zawsze do Twojej dyspozycji.</p></div>
                    </Block>  
                    <Block className='blockMedium'>
                        <div className={styles.blockTitle}>
                            Kompleksowość, którą docenisz.
                        </div>
                        <div className={styles.blockText}><p>Wszystko, co niezbędne w jednym miejscu, dostępne na każdym urządzeniu i o każdej porze. Twoja firma tam gdzie Ty!</p></div>
                    </Block>   
                </div>

                <div className={styles.secondTitle}>
                    <div className={styles.title}>
                        {/* <span className={styles.boldFont}>wFirma</span> w liczbach — Postaw na doświadczenie */}
                        Nasz partner <span className={styles.boldFont}>wfirma.pl</span> w&nbsp;liczbach
                    </div>
                </div>

                <div className={styles.records}>
                    <div className={styles.record}>
                        <div className={styles.top}>390&nbsp;tyś</div>
                        <div className={styles.bottom}>zarejestrowanych użytkowników</div>
                    </div>
                    <div className={styles.record}>
                        <div className={styles.top}>15&nbsp;lat</div>
                        <div className={styles.bottom}>na&nbsp;rynku księgowości</div>
                    </div>
                    <div className={styles.record}>
                        <div className={styles.top}>3&nbsp;mln.</div>
                        <div className={styles.bottom}>wysłanych e&#8209;deklaracji</div>
                    </div>
                    <div className={styles.record}>
                        <div className={styles.top}>62&nbsp;mln.</div>
                        <div className={styles.bottom}>wystawionych faktur</div>
                    </div>
                </div>

                <Billboard noBackground={true}>
                    <div className={styles.noBackgroundBillboardText}>
                        Zawsze możesz liczyć na&nbsp;naszą pomoc. Zapewniamy stałe wsparcie merytoryczne oraz szybką pomoc techniczną.
                    </div>
                </Billboard>

            </div>

            <Footer/>

            {/* <div className={styles.thirdTitle}>
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
             */}

        </div>
    )
}

export default Ksiegowosc
