import React from 'react'
import styles from '../styles/MoreBtn.module.scss'
import Link from 'next/link'

const MoreBtn = ({show, mainColorBg=false}) => {
    return (
        <>
            {!mainColorBg && <div className= {show? styles.moreBtnShow: styles.moreBtnNone}>
                <Link href="/cennik">
                    <a>
                        Zobacz ofertę                    
                    </a>
                </Link>
                {/* <p>
                    Zobacz ofertę
                </p> */}            
            </div>}
            {mainColorBg && <div className= {styles.mainColorBg}>
                <Link href="/cennik">
                    <a>
                        Zobacz ofertę                    
                    </a>
                </Link>
                {/* <p>
                    Zobacz ofertę
                </p> */}
            </div>}
        </>
        
    )
}

export default MoreBtn
