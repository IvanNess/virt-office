import styles from '../styles/Home.module.scss'
import Header from '../components/header'
import MainWhy from '../components/main-why'
import Packages from '../components/packages'
import Block from '../components/block'
import Sidebar from '../components/side-bar'
import Billboard from '../components/billboard'
import { useSelector, useDispatch } from 'react-redux'
import MainPageHeaders from '../components/main-page-headers'
import Link from 'next/link'
import { Carousel } from 'antd'
import Footer from '../components/footer'
import Calendar from './calendar'
import HomePageCalendar from '../components/home-page-calendar'
import { setShowAuth } from '../redux/actions'
import WynajmijButton from '../components/wynajmij-button'
import Line from '../components/line'
import { useRef } from 'react'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import HeaderOne from '../components/home/headerOne'
import HeaderTwo from '../components/home/headerTwo'
import HeaderThree from '../components/home/headerThree'
import PanelBlockOne from '../components/home/PanelBlockOne'
import PanelBlockTwo from '../components/home/PanelBlockTwo'
import PanelBlockThree from '../components/home/PanelBlockThree'
import TitleOne from '../components/home/titleOne'
import MiddleText from '../components/home/midleText'
import MiddleBlock from '../components/home/middleBlock'
import CalendarTitle from '../components/home/calendarTitle'
import CalendarDescription from '../components/home/calendarDescription'
import TitleThree from '../components/home/titleThree'
import DescriptionEnd from '../components/home/descriptionEnd'
import EndPanel from '../components/home/endPanel'

export default function Home({db, auth}) {

  const dispatch = useDispatch()

  const wynajmijBiuroRef = useRef()
  const router = useRouter()
  const language = useSelector(state=>state.language)

  useEffect(()=>{
    console.log('router', router)
    if(router.asPath.includes('#wynajmij-biuro'))
    wynajmijBiuroRef.current.scrollIntoView()
  }, [router.query])

  function showAuth(){
    dispatch(setShowAuth({show: true, isLogin: true}))
  }

  return (
    <div 
      className={router.asPath.includes('#wynajmij-biuro') ? styles.containerNoAnimation : styles.container}
      style={{display: language? 'block': 'none'}}
    >

      <Sidebar auth={auth}/>

      <Line/>

      <Billboard>
        <Header/>
        <Carousel autoplay={true} autoplaySpeed={8000} pauseOnHover={false}>
          <HeaderOne/>
          <HeaderTwo/>
          <HeaderThree/>
        </Carousel>
        <WynajmijButton/>
      </Billboard>

      <div style={{margin: 'auto', maxWidth: '1440px'}}>
        <TitleOne/>
        <div className={styles.blocks}>
          <div className={styles.fullBlockWrapper}>
            <PanelBlockOne/>
            <PanelBlockTwo/>
            <PanelBlockThree/>
          </div>     
        </div>
        <MiddleText/>
      </div>

      <div className={styles.wfirmaBlockWrapper}>
        <MiddleBlock/>
      </div>

      <div style={{margin: 'auto', maxWidth: '1440px'}}>

        <div className={styles.calendarTitle} ref={wynajmijBiuroRef}>
          <CalendarTitle/>
        </div>

        <CalendarDescription/>

        <div className={styles.homePageCalendar}>
          <Calendar db={db} auth={auth}/>
        </div>
        
        <TitleThree/>
        <DescriptionEnd/>

        <div className={styles.blocksTwo}>
          <div className={styles.blockLarge}>
            <Block className='blockLarge' showMore={true} mainColorBg={true}>
              <EndPanel/>   
            </Block>
          </div>       
        </div>

      </div>

      <Footer auth={auth}/>
    </div>
  )
}
