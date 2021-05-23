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

export default function Home({db, auth}) {

  const dispatch = useDispatch()

  function showAuth(){
    dispatch(setShowAuth({show: true, isLogin: true}))
  }

  return (
    <div className={styles.container}>

      <Sidebar auth={auth}/>

      <Line/>

      <Billboard>
        <Header/>
        {/* <div className={styles.headerTitle}>
            <span className={styles.headerBoldFont}>ADRES</span> – obsługa biura – 
            <span className={styles.headerBoldFont}>KSIĘGOWOŚĆ</span> – konsultacje prawne – 
            <span className={styles.headerBoldFont}>MARKETING</span>
        </div> */}
        {/* <div className={styles.headerText}>
          Działaj z dowolnego miejsca na świecie dzięki opcji biura wirtualnego. Nasze usługi biura wirtualnego obejmują odbieranie połączeń telefonicznych i obsługę poczty z profesjonalnym adresem firmy w dowolnym centrum biznesowym Regus na świecie.
        </div>
        <form className={styles.headerForm}>
          <input className={styles.textInput} type="text" name="" id="" placeholder="Wpisz miasto"/>
          <input className={styles.buttonInput} type="button" value="WYSZUKAJ"/>
        </form> */}

        <Carousel autoplay={true} autoplaySpeed={8000} pauseOnHover={false}>
          <div className={styles.headerOne}>
            <div className={styles.headerFlex}>
              <div className={styles.headerTitle}>
                  optymalne koszty prowadzenia firmy dzięki <span className={styles.headerBoldFont}>WIRTUALNYM</span> biurom już od <span className={styles.headerBoldFont}>55 PLN </span> miesięcznie
              </div>
              <div className={styles.headerText}>
                <span className={styles.headerTextBoldFont}>NIEWIELKIE STAŁE KOSZTY </span>
                funkcjonowania firmy dają możliwość efektywniejszego zarabiania. Specyfika niektórych rodzajów działalności daje możliwość 
                <span className={styles.headerTextBoldFont}> OSZCZĘDNOŚCI </span>
                na wynajmie przestrzeni biurowych
                <span className={styles.headerTextBoldFont}> WYKORZYSTAJCIE </span>
                to i <span className={styles.headerTextBoldFont}>ZARABIAJCIE WIĘCEJ.</span>
              </div>
            </div>  
          </div>

          <div className={styles.headerTwo}>
            <div className={styles.headerFlex}>
              <div className={styles.headerTitle}>
                  <div className={styles.top}>
                      wszystkie potrzeby <span className={styles.headerBoldFont}>PRZEDSIĘBIORCY</span> w&nbsp;jednym pakiecie 
                  </div>
                  <div className={styles.bottom}>
                      <span className={styles.headerBoldFont}>ADRES</span> - obsługa biura – <span className={styles.headerBoldFont}>KSIĘGOWOŚĆ</span> – konsultacje prawne - <span className={styles.headerBoldFont}>MARKETING</span>
                  </div>
              </div>
              <div className={styles.headerText}>
                <span className={styles.headerTextBoldFont}>ZARABIAJ </span>
                koncentrując się na procesach, które przynoszą
                <span className={styles.headerTextBoldFont}> ZYSK. </span>My zajmiemy się 
                <span className={styles.headerTextBoldFont}> OPTYMALIZACJĄ KOSZTÓW, </span>
                czyli pozostałymi procesami takimi jak obsługa korespondencji, wprowadzanie dokumentów do systemów księgowych, księgowość, marketing.
              </div>
            </div>   
          </div>

          {/* <div className={styles.headerTitle}>
              <span className={styles.headerBoldFont}>ADRES</span> – obsługa biura – 
              <span className={styles.headerBoldFont}>KSIĘGOWOŚĆ</span> – konsultacje prawne – 
              <span className={styles.headerBoldFont}>MARKETING</span>
          </div> */}

          <div className={styles.headerThree}>
            <div className={styles.headerFlex}>
              <div className={styles.headerTitle}>
                  nie tylko <span className={styles.headerBoldFont}>WIRTUALNE</span> – w ramach oferty można korzystać z <span className={styles.headerBoldFont}>PRZESTRZENI KONFERENCYJNEJ</span> oznakowanej <span className={styles.headerBoldFont}>LOGIEM</span> własnej firmy
              </div>
              <div className={styles.headerText}>
                  Czasami trzeba się 
                  <span className={styles.headerTextBoldFont}> SPOTKAĆ </span>
                  dlatego udostępniamy pod adresem rejestracji firmy
                  <span className={styles.headerTextBoldFont}> PRZESTRZEŃ KONFERENCYJNĄ </span>
                  gdzie można przy jednym stole i dobrej „kawie" przeprowadzić negocjacje i podpisać
                  <span className={styles.headerTextBoldFont} > LUKRATYWNE KONTRAKTY.</span>                
              </div>
            </div>

          </div>
        </Carousel>
        <WynajmijButton/>

      </Billboard>

      <div style={{margin: 'auto', maxWidth: '1440px'}}>

      <div className={styles.title}>
        dlaczego warto skorzystać z <span className={styles.boldFont}>VIRTOFFICE</span>
      </div>

      <div className={styles.blocks}>
        {/* <MainWhy 
          text='Oferujemy wynajem adresu wraz z pakietem usług w atrakcyjnej cenie już od 55 PLN miesięcznie. Wirtualne biuro, czyli wirtualny adres, w porównaniu z wynajmem konwencjonalnego biura, umożliwia optymalizację kosztów prowadzenia firmy. Dzięki temu, że możesz skomponować pakiet usług dostosowany do swoich potrzeb, płacisz za to, co jest Ci potrzebne.'
        /> */}
        
        <div className={styles.fullBlockWrapper}>
          <div className={styles.blockWrapper}>
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
          </div>
          
          <div className={styles.blockWrapper}>
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
          </div>

          <div className={styles.blockWrapper}>
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
          </div> 
        </div>
        
        {/* <div className={styles.splitBlockWrapper}>
          <div className={styles.blockWrapper}>
            <Block className='block' showMore={false}>
              <div className={styles.blockText}>
                Oferujemy wynajem adresu wraz z pakietem usług w atrakcyjnej cenie już od  
                <span className={styles.boldText}> 55&nbsp;PLN miesięcznie.</span>
                <br/>
                <br/>
                Wirtualne biuro, czyli wirtualny adres, w porównaniu z wynajmem konwencjonalnego biura, umożliwia optymalizację kosztów prowadzenia firmy. Dzięki temu, że możesz skomponować pakiet usług dostosowany do swoich potrzeb, płacisz za to, co jest Ci potrzebne.
                <br/>
                <br/>
                Nasza oferta jest kompleksowa i dostosowana do rzeczywistych potrzeb przedsiębiorcy. 
              </div>
            </Block>   
          </div>

          <div className={styles.blockWrapper}>
            <Block className='block' showMore={true}>
              <div className={styles.blockText}>
                Oprócz adresu uzyskujesz obsługę korespondencji, archiwizację dokumentów, dostęp do sali konferencyjne umożliwiający organizację spotkań z klientami. We współpracy z naszym partnerem wfirma.pl oferujemy również usługi księgowe.
                <br/>
                <br/>
                Wszystkie formalności związane z wynajmem biura, czy sali konferencyjnej i korzystaniem z naszych pozostałych usług możesz zrealizować zdalnie. 
                <br/>
                <br/>
                Proces zawarcia umowy z nami zajmuje kilka minut, ponieważ szanujemy Twój czas i pieniądze. Poprzez stronę internetową lub aplikację korzystasz ze swojego wirtualnego biura z dowolnego miejsca i w dowolnym czasie.
              </div>
            </Block>   
          </div>
        </div>
         */}
             
      </div>

      {/* <div className={styles.titleTwo}>
        WYBÓR PAKIETU USŁUG<div className={styles.boldFont}>BIURA WIRTUALNEGO</div>
      </div> */}

      {/* <Packages/> */}
      
      {/* <Billboard noBackground={true}>
        <div className={styles.noBackgroundBillboardText}>
          <span className={styles.headerBoldFont}>ADRES</span> - obsługa biura – <span className={styles.headerBoldFont}>KSIĘGOWOŚĆ</span> – konsultacje prawne - <span className={styles.headerBoldFont}>MARKETING</span>
        </div>
      </Billboard> */}

      {/* <div className={styles.textBlock}>
        <div className={styles.text}>
          <p>
            Wirtualne biuro to nie tylko wirtualny adres, ale również obsługa korespondencji przychodzącej polegająca na jej skanowaniu, przekazywaniu i archiwizacji. 
            <br/>
            <br/>
            <span className={styles.boldText}>
              W ramach usługi dajemy dostęp do sali konferencyjnej oznakowanej logiem Twojej firmy w czasie, w którym z niej korzystasz, wyposażonej w stół konferencyjny, rzutnik z ekranem do wyświetlania prezentacji, drukarkę ze skanerem, aneks kuchenny do przygotowania kawy/herbaty, strefę chillout dającą komfort prowadzenia rozmów. 
            </span>
            <br/>
            <br/>
            Każda firma potrzebuje usług księgowych i prawnych. We współpracy z naszym partnerem <span className={styles.boldText}>wfirma.pl </span>
            dostarczamy również te usługi w ramach naszych pakietów.
          </p>
        </div>
        <div className={styles.image}>
          <img src="/images/vb-phone.jpg" alt=""/>
        </div>
      </div> */}
      
      <div className={styles.middleText}>
        <p>
          {/* Wirtualne biuro to nie tylko wirtualny adres, ale również obsługa korespondencji przychodzącej polegająca na jej skanowaniu, przekazywaniu i archiwizacji. 
          W ramach usługi dajemy dostęp do sali konferencyjnej oznakowanej logiem Twojej firmy w czasie, w&nbsp;którym z niej korzystasz, wyposażonej w stół konferencyjny, rzutnik z ekranem do wyświetlania prezentacji, drukarkę ze skanerem, aneks kuchenny do przygotowania kawy/herbaty, strefę chillout dającą komfort prowadzenia rozmów. 
          <br/><br/>
          Każda firma potrzebuje usług księgowych i prawnych. We&nbsp;współpracy z naszym partnerem wfirma.pl dostarczamy również te usługi w ramach naszych pakietów. */}
          W ramach usługi dajemy również dostęp do sali konferencyjnej, która na czas użytkowania będzie oznakowana logiem Twojej firmy. Sala wyposażona jest w stół konferencyjny, rzutnik z&nbsp;ekranem do wyświetlania prezentacji, drukarkę ze skanerem, aneks kuchenny do przygotowywania kawy lub herbaty oraz strefę chillout dającą komfort prowadzenia rozmów.
        </p>
      </div>

      </div>

      <div className={styles.wfirmaBlockWrapper}>
        <div className={styles.wfirmaText}>
          <h4>Korzystając z usług wirtualnego biura otrzymujesz 
            <span className={styles.bold}> Pakiet roczny wFirma na rok całkowite za&nbsp;darmo! </span>
            {/* Przejdź i <span className={styles.underline} onClick={()=>{showAuth()}}>zaloguj sie</span>  */}
          </h4>
        </div>
      </div>

      <div style={{margin: 'auto', maxWidth: '1440px'}}>

      <div className={styles.calendarTitle}>
        <span className={styles.boldFont}>WYNAJMIJ BIURO NA GODZINY</span>
      </div>

      <div className={styles.smallText}>
        {/* U NAS ISTNIEJE MOŻLIWOŚĆ WYNAJĘCIA PRRZESTRZENI BIUTROWEJ NA SPOTKANIA Z KLINENTEM. SPRAWDZ DOSTEPNY TERMIN I ZAREZERWUJ ! */}
        wynajem sali konferencyjnej na godziny jest świetnym uzupełnieniem wynajmu wirtualnego adresu. Czasami powstaje potrzeba spotkania się z partnerami biznesowymi w warunkach komfortowych do przeprowadzenia rozmów lub prezentacji. 
        <span className={styles.smallTextBold}>{` SPRAWDŹ DOSTĘPNE TERMINY I ZAREZERWUJ`}</span>
      </div>

      <div className={styles.homePageCalendar}>
        <Calendar db={db} auth={auth}/>
      </div>
      

      <div className={styles.titleThree}>
        CENA BEZ UKRYTYCH KOSZTÓW  — <span className={styles.boldFont}>załatw wszystkie formalności online</span>
      </div>

      <div className={styles.smallText}>
        {/* możesz załatwić wszystkie formalności online – MOŻESZ RÓWNIEŻ NAS ODWIEDZIĆ – umów się wcześniej na spotkanie */}
        dzięki skorzystaniu z naszej oferty wirtualnego adresu lub wynajmu sali konferencyjnej możesz załatwić wszystkie formalności on-line lub po wcześniejszym umówieniu się w naszej siedzibie.
      </div>

      <div className={styles.blocksTwo}>
        {/* <Block className='blockLarge'>
          <div className={styles.blockTitle}>
            Wirtualny podpis od firmy <span className={styles.boldFont}>coblit</span>
          </div>
          <div className={styles.blockText}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin at ex bibendum, lacinia leo a, faucibus mauris. Quisque quis libero risus. Etiam at vestibulum lorem. Quisque purus ante, semper et semper id, rhoncus a felis. Nulla quam enim, ultrices ac ipsum id, imperdiet venenatis urna.
          </div>        
        </Block>  */}

        <div className={styles.blockLarge}>
          <Block className='blockLarge' showMore={true} mainColorBg={true}>
            {/* <div className={styles.blockTitle}>
              On-linowa księgowość z <span className={styles.boldFont}>wfirma.pl</span>
            </div> */}
            <div className={styles.blockLargeInner}>
              <div className={styles.left}>
                <div className={styles.blockHeader}>
                  <div className={styles.blockHeaderFirst}>
                    Płać tylko za wykorzystane usługi
                  </div>
                </div>
                <div className={styles.blockText}>
                  {/* obsługę poczty, biuro wirtualne z pełnym pakietem usług czy dowolną inną opcję   */}
                  wirtualny adres Twojej firmy wynajęty w virtoffice.pl daje Ci możliwość obsługi korespondencji, korzystania z sali konferencyjnej, optymalnych kosztów księgowości i archiwizacji dokumentów. Wszystkie usługi związane z wynajmem adresu możesz mieć dostosowane do swoich indywidulanych potrzeb. To da możliwość stosunkowo niskich i optymalnych kosztów stałych związanych z prowadzoną przez Ciebie działalnością
                </div>
              </div>
              <div className={styles.right}>
                <div className={styles.blockHeader}>
                  <div className={styles.blockHeaderFirst}>
                    Sala konferencyjna
                  </div>
                </div>
                <div className={styles.blockText}>
                  {/* to świetne miejsce do spotkań i prowadzenia negocjacji. Umożliwiamy Ci wynajem sali konferencyjnej na godziny. */}
                  wynajem sali konferencyjnej daje możliwość spotkań biznesowych w pełni zautomatyzowanym i świetnie wyposażonym wnętrzu. Ekran, rzutnik, stół konferencyjny, strefa chill czy choćby zaplecze sanitarno-kuchenne daje pełny komfort rozmów. Dodatkowo sala na czas spotkania jest oznakowana logiem Twojej firmy, a wszystkie formalności możesz załatwić online.
                </div>   
              </div>
            </div>   
          </Block>
        </div>
               
      </div>

      </div>

      <Footer/>
    </div>
  )
}
