import styles from '../styles/Home.module.scss'
import Header from '../components/header'
import MainWhy from '../components/main-why'
import Packages from '../components/packages'
import Block from '../components/block'
import Sidebar from '../components/side-bar'
import Billboard from '../components/billboard'
import { useSelector } from 'react-redux'

export default function Home() {

  return (
    <div className={styles.container}>

      <Sidebar/>

      <Billboard>
        <Header/>
        <div className={styles.headerTitle}>
          DZIAŁAJ WYDAJNIE DZIĘKI NOWOCZESNYM <span className={styles.headerBoldFont}>WIRTUALNYM</span> PRZESTRZENIOM DO PRACY
        </div>
        <div className={styles.headerText}>
          Działaj z dowolnego miejsca na świecie dzięki opcji biura wirtualnego. Nasze usługi biura wirtualnego obejmują odbieranie połączeń telefonicznych i obsługę poczty z profesjonalnym adresem firmy w dowolnym centrum biznesowym Regus na świecie.
        </div>
        <form className={styles.headerForm}>
          <input className={styles.textInput} type="text" name="" id="" placeholder="Wpisz miasto"/>
          <input className={styles.buttonInput} type="button" value="WYSZUKAJ"/>
        </form>
      </Billboard>
              
      <div className={styles.title}>
        DLACZEGO WARTO WYBRAĆ PRZESTRZENIE Wirtualne <span className={styles.boldFont}>ZAWODZIE 20?</span>
      </div>

      <div className={styles.blocks}>
        <MainWhy text='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin at ex bibendum, lacinia leo a, faucibus mauris. Quisque quis libero risus. Etiam at vestibulum lorem. Quisque purus ante, semper et semper id, rhoncus a felis. Nulla quam enim, ultrices ac'/>
        <Block className='block' showMore={true}>
          <div className={styles.blockText}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin at ex bibendum, lacinia leo a, faucibus mauris. Quisque quis libero risus. Etiam at vestibulum lorem. Quisque purus ante, semper et semper id, rhoncus a felis. Nulla quam enim, ultrices ac ipsum id, imperdiet venenatis urna.
          </div>
        </Block>
        <Block className='block' showMore={false}>
          <div className={styles.blockText}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin at ex bibendum, lacinia leo a, faucibus mauris. Quisque quis libero risus. Etiam at vestibulum lorem. Quisque purus ante, semper et semper id, rhoncus a felis. Nulla quam enim, ultrices ac ipsum id, imperdiet venenatis urna.
          </div>
        </Block>
        <Block className='block' showMore={false}>
          <div className={styles.blockText}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin at ex bibendum, lacinia leo a, faucibus mauris. Quisque quis libero risus. Etiam at vestibulum lorem. Quisque purus ante, semper et semper id, rhoncus a felis. Nulla quam enim, ultrices ac ipsum id, imperdiet venenatis urna.
          </div>
        </Block>        
      </div>

      <div className={styles.titleTwo}>
        WYBÓR PAKIETU USŁUG<div className={styles.boldFont}>BIURA WIRTUALNEGO</div>
      </div>

      <Packages/>
      
      {/* <div className={styles.bigBlock}>
        <div className={styles.withBackground}></div> */}
      <Billboard noBackground={true}>
        <div className={styles.noBackgroundBillboardText}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin at ex bibendum, lacinia leo a, faucibus mauris. Quisque quis libero risus. Etiam at vestibulum lorem. Quisque purus ante, semper et semper id.
        </div>
      </Billboard>
      {/* </div> */}

      <div className={styles.titleThree}>
        CENA BEZ UKRYTYCH KOSZTÓW  — <span className={styles.boldFont}>załatw wszystkie formalności online</span>
      </div>

      <div className={styles.smallText}>
        Płać tylko za wykorzystane usługi — obsługę poczty, biuro wirtualne z pełnym pakietem usług czy dowolną inną opcję
      </div>

      <div className={styles.blocksTwo}>
        <Block className='blockLarge'>
          <div className={styles.blockTitleTwo}>
            Wirtualny podpis od firmy <span className={styles.boldFont}>coblit</span>
          </div>
          <div className={styles.blockTextTwo}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin at ex bibendum, lacinia leo a, faucibus mauris. Quisque quis libero risus. Etiam at vestibulum lorem. Quisque purus ante, semper et semper id, rhoncus a felis. Nulla quam enim, ultrices ac ipsum id, imperdiet venenatis urna.
          </div>        
        </Block> 

        <Block className='blockLarge'>
          <div className={styles.blockTitleTwo}>
            On-linowa księgowość z <span className={styles.boldFont}>wfirma.pl</span>
          </div>
          <div className={styles.blockTextTwo}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin at ex bibendum, lacinia leo a, faucibus mauris. Quisque quis libero risus. Etiam at vestibulum lorem. Quisque purus ante, semper et semper id, rhoncus a felis. Nulla quam enim, ultrices ac ipsum id, imperdiet venenatis urna.
          </div>        
        </Block>       
      </div>

    </div>
  )
}
