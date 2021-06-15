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
import KsiegowoscHeader from '../components/ksiegowosc/ksiegowosc-header'
import KsiegowoscTitleOne from '../components/ksiegowosc/ksiegowosc-title-one'
import KsiegowoscBlocks from '../components/ksiegowosc/ksiegowosc-blocks'
import KsiegowoscTitleTwo from '../components/ksiegowosc/ksiegowosc-title-two'
import Digits from '../components/ksiegowosc/digits'
import KsiegowoscEnd from '../components/ksiegowosc/ksiegowosc-end'
import { useSelector } from 'react-redux'

function Ksiegowosc({auth}) {
    const Hyphen = ()=> <span className={styles.hyphen}>&mdash;&mdash;&mdash;&mdash;&mdash;</span>

    const language=useSelector(state=>state.language)

    return (
        <div className={styles.ksiegowosc} style={{display: language? 'block': 'none'}}>
            <Sidebar auth={auth}/>

            <Line/>

            <Billboard>
                <Header/>
                <KsiegowoscHeader/>
                <WynajmijButton/>
            </Billboard>
            
            <div style={{margin: 'auto', maxWidth: '1440px'}}>

                <KsiegowoscTitleOne/>
                <KsiegowoscBlocks/>
                <KsiegowoscTitleTwo/>
                <Digits/>
                <KsiegowoscEnd/>

            </div>

            <Footer auth={auth}/>

        </div>
    )
}

export default Ksiegowosc
