import React from 'react'

import styles from '../styles/Polityka.module.scss'
import Billboard from '../components/billboard'
import Header from '../components/header'
import Sidebar from '../components/side-bar'
import Block from '../components/block'
import Link from 'next/link'
import Footer from '../components/footer'
import WynajmijButton from '../components/wynajmij-button'
import Line from '../components/line'
import { useSelector } from 'react-redux'

function Regulamin({auth}) {
    const Hyphen = ()=> <span className={styles.hyphen}>&mdash;&mdash;&mdash;&mdash;&mdash;</span>

    const language = useSelector(state=>state.language)

    return (
        <div className={styles.regulamin} style={{display: language? 'block': 'none'}}>
            <Sidebar auth={auth}/>

            <Line/>

            <Billboard>
                <Header/>
                <div className={styles.headerTitle}>
                    <div className={styles.headerBoldFont}>Regulamin świadczenia usług</div>
                </div>
                {/* <div className={styles.headerText}>
                    Polityka prywatności opisuje zasady przetwarzania przez nas informacji na Twój temat, w tym danych osobowych oraz ciasteczek, czyli tzw. cookies.
                </div>
                <WynajmijButton/> */}
            </Billboard>
            
            <div className={styles.mainWrapper} style={{margin: 'auto', maxWidth: '1440px'}}>

                <div className={styles.title}>
                    §1. <span className={styles.boldFont}>DEFINICJE</span>
                </div>
                <div className={styles.smallText}>
                    Poszczególne sformułowania zawarte w niniejszym regulaminie pisane z dużej litery, oznaczają:
                    <br/>
                    <br/>
                    Regulamin (lub Regulamin główny) - niniejszy regulamin,
                    <br/>
                    <br/>
                    <span className={styles.bold}>Usługodawca</span> - spółka pod firmą Hrex Spółka z ograniczoną odpowiedzialnością z siedzibą w Gdańsku, ul. Zawodzie 20, 80-726 Gdańsk, wpisana do Rejestru Przedsiębiorców Krajowego rejestru Sądowego prowadzonego przez Sąd Rejonowy w Gdańsku, VII Wydział Gospodarczy KRS pod numerem KRS 0000586207, NIP 5833188734, REGON 362992596 zwana dalej Hrex lub Usługodawca,
                    <br/>
                    <br/>
                    <span className={styles.bold}>Usługobiorca</span> - klient korzystający z Usług świadczonych przez Usługodawcę na zasadach określonych w Regulaminie. Usługobiorca jest przedsiębiorcą wykonującym we własnym imieniu działalność gospodarczą. Może on być osobą fizyczną, osobą prawną lub jednostką organizacyjną niebędącą osobowości prawnej, której odrębna ustawa przyznaje zdolność prawną,
                    <br/>
                    <br/>
                    <span className={styles.bold}>Użytkownik</span> - osoba posiadająca konto w Serwisie, upoważniona do reprezentowania Usługobiorcy i korzystania z Serwisu w jego imieniu.
                    <br/>
                    <br/>
                    <span className={styles.bold}>virtoffice.pl (lub System, Serwis)</span> - system informatyczny strony internetowej pod adresem <Link href='https://virtoffice.pl'><a>https://virtoffice.pl</a></Link> ; narzędzie o charakterze zawodowym, wspierające prowadzenie każdej pozarolniczej działalności gospodarczej zgodnie z wybranym przez Usługobiorcę PKD.
                    <br/>
                    <br/>
                    <span className={styles.bold}>Usługi</span> - usługi świadczone przez Usługodawcę za pośrednictwem Serwisu virtoffice.pl.
                    <br/>
                    <br/>
                    <span className={styles.bold}>Pakiet usług</span> - grupa konkretnych Usług oferowana przez Usługodawcę za pośrednictwem Serwisu virtoffice.pl. Bieżące Pakiety usług oraz opłaty za nie uwidocznione są Cenniku.
                    <br/>
                    <br/>
                    <span className={styles.bold}>Umowa</span> - stosunek prawny łączący Usługodawcę z Usługobiorcą, na podstawie którego Usługodawca świadczy Usługi na rzecz Usługobiorcy.
                    <br/>
                    <br/>
                    <span className={styles.bold}>Dzień rejestracji</span> - dzień, w którym zgodnie ze wskazówkami umieszczonymi w Serwisie, Usługobiorca wybrał swój identyfikator, tajne hasło i uzyskał możliwość korzystania z Serwisu. Od dnia rejestracji Usługobiorcy przysługuje prawo do Okresu testowego.
                    <br/>
                    <br/>
                    <span className={styles.bold}>Okres abonamentowy</span> - okres, na który Usługi udostępniane są Usługobiorcy, przy czym nie dłuższy niż określony w Cenniku i elektronicznym wniosku zamówienia Usług.
                    <br/>
                    <br/>
                    <span className={styles.bold}>Opłata abonamentowa</span> - opłata uiszczana przez Usługobiorcę tytułem korzystania z  Usług, ustalana zgodnie z Cennikiem obowiązującym w chwili zamówienia danych Usług. Opłata abonamentowa uiszczana jest z góry.
                    <br/>
                    <br/>
                    <span className={styles.bold}>Cennik</span> - zakładka znajdująca się w Serwisie zawierająca informacje dotyczące wysokości Opłat abonamentowych za korzystanie z konkretnych Usług oraz Pakietów usług.
                    <br/>
                    <br/>
                    <span className={styles.bold}>Partner serwisu</span> – inny serwis internetowy, którego oferta jest dołączona do oferty usług virtoffice.pl i jest ona zaprezentowana na stronie virtoffice.pl

                </div>

                <div className={styles.title}>
                    §2. <span className={styles.boldFont}>POSTANOWIENIA OGÓLNE</span>
                </div>
                <div className={styles.smallText}>
                    Regulamin określa zasady świadczenia Usług przez Usługodawcę za pośrednictwem Systemu virtoffice.pl, zasady korzystania z Usług oraz zasady ochrony danych osobowych Usługobiorców i Użytkowników, będących osobami fizycznymi.
                    <br/><br/>
                    Użytkownicy przed rozpoczęciem korzystania z Systemu virtoffice.pl zobowiązani są do zapoznania się z Regulaminem.
                    <br/><br/>
                    Usługi świadczone są drogą elektroniczną na rzecz Usługobiorców. Świadczenie Usług odbywa się na mocy Umowy zawieranej zgodnie z postanowieniami Regulaminu.
                    <br/><br/>
                    Usługobiorca oświadcza, iż korzystanie z Usługi ma charakter zawodowy i jest ściśle związane z charakterem prowadzonej przez niego działalności gospodarczej.
                    <br/><br/>
                    Udostępniany Usługobiorcy System wraz ze wszystkimi jego funkcjami stanowi całość i nie ma możliwości jego personalizowania poprzez wyłączenia poszczególnych funkcji, czy też rezygnację z wybranych rozwiązań. O zawartości funkcji w systemie decyduje Usługodawca.
                    <br/><br/>
                    Usługodawca zastrzega możliwość zmiany funkcjonalności Serwisu w każdym czasie, przy czym zmiany te nie stanowią zmiany Regulaminu.
                </div>

                <div className={styles.title}>
                    §3. <span className={styles.boldFont}>RODZAJE I ZAKRES USŁUG</span>
                </div>
                <div className={styles.smallText}>
                    Usługi świadczone są na rzecz Usługobiorców za pośrednictwem Systemu virtoffice.pl.
                    <br/><br/>
                    Usługodawca zobowiązuje się do świadczenia na rzecz Usługobiorców Usług, które w ujęciu ogólnym polegają na:
                    <br/><br/>
                    udostępnianiu Usługobiorcy adresu do rejestracji i w zakresie ograniczonym do wybranej przez Usługobiorcę Usługi korzystania ze zapewniających mu możliwość prowadzenia działalności przywilejów związanych z gromadzeniem i przetwarzaniem danych korzystania z powierzchni biurowych znajdujących się pod wynajętym przez Usługobiorcę adresem,
                    <br/><br/>
                    przechowywaniu w Serwisie wprowadzonych przez Usługobiorcę danych na zasadach określonych w Regulaminie,
                    <br/><br/>
                    aktualizacji Serwisu w sposób umożliwiający Usługobiorcom korzystanie z niego zgodnie z przeznaczeniem oraz bezwzględnie obowiązującymi przepisami prawa polskiego,
                    <br/><br/>
                    archiwizacji danych i zabezpieczeniu ich przed utratą,
                    <br/><br/>
                    dostarczaniu Usługobiorcy dodatkowych narzędzi w celu umożliwienia korzystania z Usług zgodnie z przeznaczeniem oraz w celu zapewnienia prawidłowości świadczenia Usług.
                    <br/><br/>
                    Konkretne Usługi zostały przez Usługodawcę pogrupowane w Pakiety usług. Bieżące Pakiety usług oraz opłaty za nie uwidocznione są w Cenniku. Zmiany zakresów danych Pakietów usług oraz ich cen nie stanowią zmiany Regulaminu.
                    <br/><br/>
                    Usługodawca świadczy Usługi odpłatnie.
                    <br/><br/>
                    Za wyjątkiem Okresu testowego rozpoczęcie świadczenia Usług na rzecz Usługobiorcy nastąpi po uiszczeniu przez niego Opłaty abonamentowej.
                    <br/><br/>
                    Usługa świadczona jest w Okresach abonamentowych. W przypadku nieprzedłużenia Okresu abonamentowego na zasadach określonych w § 8, dostęp Usługobiorcy do Usług wygasa wraz ze wszystkimi wykupionymi Dodatkami, niezależnie od stopnia ich wykorzystania przez Usługobiorcę.
                    <br/><br/>
                    W celu umożliwienia Usługobiorcy korzystania z Usług zgodnie z ich przeznaczeniem Usługodawca dostarcza Usługobiorcy dodatkowe narzędzia w postaci:
                    <br/><br/>
                    Forum - forum użytkowników Systemu virtoffice.pl przeznaczone dla Usługobiorców oraz Użytkowników, umożliwiające zgłaszanie problemów, pomysłów, opinii oraz pytań dotyczących funkcjonowania Systemu;
                    <br/><br/>
                    Support - wsparcie merytoryczne oraz techniczne dla Użytkowników w formie indywidualnych zapytań i odpowiedzi;
                    <br/><br/>
                    Poradnik - poradnik dla Usługobiorców oraz Użytkowników zawierający artykuły i opracowania zagadnień z zakresu prawa gospodarczego, podatków, prawa pracy i innych dziedzin prawa;
                    <br/><br/>
                    Newsletter - przesyłane cyklicznie Użytkownikom zestawie istotnych informacji o podatkach, składkach ZUS, zmianach w prawie oraz organizacji Systemu;
                    <br/><br/>
                    Informacje wewnątrzsystemowe dotyczące funkcji Serwisu - nieprofilowane informacje dotyczące możliwości Systemu przeznaczone dla Użytkowników. Ich  celem jest poznanie możliwości funkcjonalnych Systemu mojo.pl i innych serwisów zintegrowanych z Systemem virtoffice.pl.
                    <br/><br/>
                    Narzędzia wskazane w ust. 7 powyżej są immanentnie związane z Systemem i Użytkownik nie ma możliwości ich wyłączenia. Jedynie od Użytkownika zależy, w jakim zakresie wykorzystuje on rzeczone narzędzia.
                </div>

                <div className={styles.title}>
                    §4. <span className={styles.boldFont}>WARUNKI TECHNICZNE KORZYSTANIA Z SERWISU I REJESTRACJA</span>
                </div>
                <div className={styles.smallText}>
                    Dostęp do wszystkich usług Serwisu virtoffice.pl możliwy jest z dowolnego komputera posiadającego połączenie z siecią Internet. Zalecane jest używanie nowszych wersji przeglądarek internetowych: Chrome, Mozilla Firefox, Internet Explorer, Safari.
                    <br/><br/>
                    Warunkiem rozpoczęcia pracy w Serwisie virtoffice.pl jest rejestracja Użytkownika zgodnie z instrukcjami zawartymi w Serwisie.
                    <br/><br/>
                    W celu prawidłowego funkcjonowania Serwisu dane wprowadzane przez Usługobiorcę powinny być zgodne z rzeczywistością.
                    <br/><br/>
                    W procesie rejestracji Usługobiorca ustala własne i znane tylko jemu: login oraz hasło.
                    <br/><br/>
                    Login Użytkownika, będący jego adresem e-mail, stanowi unikalną nazwę Użytkownika, umożliwiającą jego identyfikację w Serwisie.
                    <br/><br/>
                    Hasło Użytkownika jest przyporządkowane do jego loginu i stanowi dodatkowe zabezpieczenie danych przed dostępem osób niepowołanych. Hasło powinno zawierać co najmniej 8 znaków, w tym przynajmniej jedną wielką literę, jedną małą literę, a także co najmniej jedną cyfrę lub jeden znak specjalny (np. !,@,#, %).
                    <br/><br/>
                    Usługodawca nie ponosi żadnej odpowiedzialności w razie ujawnienia przez Usługobiorcę hasła lub identyfikatora osobom trzecim.
                    <br/><br/>
                    Od dnia dokonania rejestracji Usługobiorca zobowiązany jest do informowania Usługodawcy o wszelkich zmianach danych teleadresowych koniecznych do wystawiania faktur i doręczeń oraz zmianach kontaktowego adresu poczty elektronicznej pod rygorem uznania za skutecznie doręczonych pism lub wiadomości e-mail wysyłanych na adresy niezaktualizowane.
                    <br/><br/>
                    Usługobiorca zobowiązuje się, że nie będzie w szczególności:
                    <br/><br/>
                    modyfikować, zakłócać, blokować, nadmiernie obciążać, przerywać, spowalniać normalne funkcjonowanie Serwisu, utrudniać jego dostępność innym Użytkownikom,
                    <br/><br/>
                    przesyłać lub rozprzestrzeniać wirusów, koni trojańskich, robaków, zainfekowanych plików lub podobnych destrukcyjnych elementów w obrębie Serwisu,
                    <br/><br/>
                    dostarczać i rozpowszechniać treści o charakterze bezprawnym lub godzących w dobre imię lub interes Usługodawcy lub podmiotów trzecich.
                    <br/><br/>
                    Dostępność Serwisu w skali roku określa się na poziomie SLA 97%.
                </div>

                <div className={styles.title}>
                    §5. <span className={styles.boldFont}>PARTNER SERWWISU</span>
                </div>
                <div className={styles.smallText}>
                    Z dniem zarejestrowania w Systemie Usługobiorca ma prawo do korzystania na preferencyjnych warunkach z ofert Partnerów serwisu.
                    <br/>
                    Hrex nie ponosi odpowiedzialności jeżeli Partner serwisu nie wywiąże się ze zobowiązań wobec Usługobiorcy związanych z promowaniem oferty Partnera serwisu przez virtoffice.pl
                    <br/>
                    Oferta Parterów serwisu jest ofertą osobną i Hrex nie ponosi odpowiedzialności za jakiekolwiek straty lub niedogodności spowodowane korzystaniem z ofert Partnerów serwisu virtoffice.pl
                    <br/>
                    Oferta Partnerów serwisu jest całkowicie niezależna od oferty virtoffice.pl i stanowi jedynie uzupełnienie funkcjonalności systemu.
                </div>

                <div className={styles.title}>
                    §6. <span className={styles.boldFont}>ZAWARCIE UMOWY O ŚWIADCZENIE USŁUG</span>
                </div>
                <div className={styles.smallText}>
                    Zawarcie Umowy o świadczenie Usług następuje z chwilą wpływu na rachunek bankowy Usługodawcy pierwszej Opłaty abonamentowej za dane Usługi na warunkach określonych w Regulaminie, Cenniku oraz zgodnie ze specyfikacją danych Usług określoną w Serwisie.
                    <br/><br/>
                    Zawarcie Umowy następuje z chwilą łącznego spełnienia następujących warunków:
                    <br/><br/>
                    zarejestrowania się Usługobiorcy w Serwisie,
                    <br/><br/>
                    akceptacji Regulaminu wraz z ewentualnymi załącznikami,
                    <br/><br/>
                    uiszczenia Opłaty abonamentowej zgodnie z Cennikiem.
                    <br/><br/>
                    Celem zapewnienia prawidłowego rozliczenia pomiędzy Usługobiorcą a Usługodawcą, Usługobiorca zobowiązany jest podczas rejestracji podać następujące dane: imię, nazwisko, nazwę firmy, adres zamieszkania, adres siedziby firmy (ulicę, numer, kod, miejscowość), NIP, adres poczty elektronicznej (e-mail).
                    <br/><br/>
                    Usługobiorca zobowiązany jest podczas rejestracji podać dane wskazane w ust. 3 zgodnie z prawdą.
                    <br/><br/>
                    Akceptacja Regulaminu przez Usługobiorcę jest równoznaczna ze złożeniem oświadczeń następujących treści:
                    <br/><br/>
                    Zapoznałem się z Regulaminem i jego załącznikami, akceptuję wszystkie jego postanowienia bez zastrzeżeń, dobrowolnie przystąpiłem do Umowy; dane zawarte w formularzu rejestracyjnym są zgodne z prawdą.
                    <br/><br/>
                    Zawierając Umowę, Usługobiorca w sposób wyraźny udziela zgody na uzyskanie dostępu do Usługi niezwłocznie po zawarciu Umowy i uiszczeniu opłaty. Usługobiorca niniejszym przyjmuje do wiadomości, że uzyskując niezwłoczny dostęp do Usługi, Usługobiorca nie ma możliwości odstąpienia od Umowy w terminie czternastu dni od jej zawarcia. Postanowienia niniejszego ustępu nie mają wpływu na prawo Usługobiorcy do rezygnacji z Usługi w dowolnym momencie Okresu testowego, bez konieczności uiszczenia zapłaty za Usługę.
                </div>

                <div className={styles.title}>
                    §7. <span className={styles.boldFont}>PŁATNOŚCI</span>
                </div>
                <div className={styles.smallText}>
                    Z tytułu świadczenia Usług Usługobiorca obowiązany jest do uiszczania Opłaty abonamentowej według kwot wskazanych w Cenniku. Zmiany cen wskazanych w Cenniku ogłaszane są w Serwisie i nie stanowią zmian niniejszego Regulaminu.
                    <br/><br/>
                    Za dzień płatności uznawany jest dzień zaksięgowania kwoty Opłaty abonamentowej należnej za daną Usługę na rachunku bankowym Usługodawcy. Po takim zaksięgowaniu na adres poczty elektronicznej Usługobiorcy przesyłana jest informacja o przydzieleniu dostępu do zakupionej Usługi wraz z fakturą VAT.
                    <br/><br/>
                    W przypadku świadczenia Usług wymagających poniesienia opłat pocztowych lub innych związanych z wysyłaniem korespondencji do Usługobiorcy do ceny usługi doliczona będzie opłata za przesłanie tejże korespondencji powiększona o marżę Usługodawcy. Opłata ta będzie fakturowana osobno niezależnie od opłat abonamentowych.
                    <br/><br/>
                    W razie zmiany danych Usługobiorcy konieczne może być powtórzenie usługi weryfikacji, o której mowa w ust. 3.
                    <br/><br/>
                    W czasie trwania aktualnego Okresu abonamentowego Usługobiorca ma prawo zmienić swój Pakiet usług wyłącznie na Pakiet usług, za który przewidziana jest wyższa Opłata abonamentowa.
                    <br/><br/>
                    Zmiana bieżącego Pakietu usług na niższy Pakiet usług nie jest możliwa.
                    <br/><br/>
                    Usługodawca po otrzymaniu płatności wystawia fakturę w formie elektronicznej, którą przesyła w formacie PDF na adres e-mail Usługobiorcy.
                    <br/><br/>
                    Faktura w postaci papierowej będzie wystawiona oraz dostarczona za pomocą poczty tradycyjnej tylko na wyraźne życzenie Usługobiorcy, wyrażone w formie pisemnej (pod rygorem nieważności) i przesłane na adres siedziby Usługodawcy, cena za przesłanie faktury zostanie doliczona do opłat za przesyłanie korespondencji.
                </div>
                   
                <div className={styles.title}>
                    §8. <span className={styles.boldFont}>PRZEDŁUŻENIE OKRESU ABONAMENTOWEGO</span>
                </div>
                <div className={styles.smallText}>
                    Przed końcem bieżącego Okresu Abonamentowego Usługodawca poinformuje Usługobiorcę za pomocą poczty elektronicznej o upływie Okresu Abonamentowego oraz o wysokości opłat za przedłużenie okresu świadczenia Usług na kolejny Okres Abonamentowy. Przedłużenie Okresu Abonamentowego jest równoznaczne z zamówieniem Usług na zasadach określonych w Regulaminie.
                    <br/><br/>
                    Usługobiorca dokonuje przedłużenia Okresu Abonamentowego poprzez dokonanie wpłaty na rachunek bankowy wskazany przez Usługodawcę tytułem korzystania z Usług w kolejnym Okresie Abonamentowym.
                    <br/><br/>
                    Dokonanie wpłaty przez Usługobiorcę tytułem korzystania z Usług w kolejnym Okresie Abonamentowym jest równoznaczne z oświadczeniem, że Usługobiorca zapoznał się z Regulaminem w jego aktualnym brzmieniu, akceptuje go, jak również akceptuje Cennik, specyfikację danych Usług, parametry bezpieczeństwa oraz inne dokumenty, o których mowa w Regulaminie i tym samym zawierana jest umowa o świadczenie Usług w kolejnym Okresie Abonamentowym.
                    <br/><br/>
                    Po zaksięgowaniu wpłaty na rachunku bankowym Usługodawcy tytułem korzystania z Usług w kolejnym Okresie Abonamentowym okres świadczenia Usług zostanie przedłużony o kolejny Okres Abonamentowy.
                    <br/><br/>
                    W przypadku gdy Opłata abonamentowa została uiszczona przed dniem upływu poprzedniego Okresu abonamentowego, kolejny Okres abonamentowy będzie liczony od daty następującej po dniu zakończenia danego Okresu Abonamentowego.
                    <br/><br/>
                    W przypadku, gdy opłata została uiszczona po zakończeniu poprzedniego Okresu abonamentowego, kolejny Okres abonamentowy liczony będzie od dnia uiszczenia Opłaty abonamentowej na poczet kolejnego Okresu abonamentowego.
                    <br/><br/>
                    Brak wpłaty na rachunku bankowym Usługodawcy tytułem korzystania z Usług w kolejnym Okresie Abonamentowym skutkować będzie zablokowaniem dostępu do Usług. W takim przypadku dane Usługobiorcy będą przechowywane przez Usługodawcę przez okres 5 lat kalendarzowych, licząc od dnia następującego po dacie upływu Okresu abonamentowego. W tym czasie Usługobiorca może w dowolnym momencie wznowić korzystanie z Usług poprzez uiszczenie Opłaty abonamentowej lub usunąć swoje konto z Serwisu.
                </div>

                <div className={styles.title}>
                    §9. <span className={styles.boldFont}>USUWANIE KONTA</span>
                </div>
                <div className={styles.smallText}>
                    Usługobiorca może w każdej chwili zrezygnować z dalszego korzystania z Usług i usunąć swoje konto z Serwisu.
                    <br/><br/>
                    Konto usuwane jest przez pracownika Hrex sp. z o.o. po zgłoszeniu chęci usunięcia konta poprzez adres e-mail koniec@hrex.eu w ciągu 3 dni roboczych od wysłania informacji z prośbą o usunięcie konta. Usunięcie konta nie skraca czasu trwania Umowy. W trakcie trwania Umowy możliwe będzie przywrócenie konta Użytkownika Systemu.
                    <br/><br/>
                    Usunięcie konta przez Usługobiorcę jest dobrowolne i nie uprawnia go do zwrotu należności za zakupioną Usługę.
                    <br/><br/>
                    Usunięcie konta przez Usługodawcę następuje automatycznie po upływie okresu wskazanego w § 8 ust. 7. Wcześniejsze usunięcie konta może nastąpić wyłącznie z inicjatywy Usługobiorcy poprzez jego działanie, zgodnie z zapisami niniejszego paragrafu.
                </div>

                <div className={styles.title}>
                    §10. <span className={styles.boldFont}>ZASADY ZAMIESZCZANIA KOMENTARZY W SERWISIE</span>
                </div>
                <div className={styles.smallText}>
                    Niedopuszczalne jest zamieszczanie w Serwisie treści o charakterze bezprawnym, godzącym dobre obyczaje lub zasady współżycia społecznego. W szczególności nie jest dozwolone zamieszczanie:
                    <br/><br/>
                    Treści naruszających prawa autorskie osób trzecich.
                    <br/><br/>
                    Treści naruszających dobra osobiste osób trzecich.
                    <br/><br/>
                    Wulgaryzmów.
                    <br/><br/>
                    Obraźliwych sformułowań.
                    <br/><br/>
                    Użytkownik zamieszcza wpisy w Serwisie wyłącznie na własną odpowiedzialność.
                    <br/><br/>
                    Usługodawca nie ma obowiązku monitorowania treści wpisów zamieszczanych przez Użytkowników w Serwisie.
                    <br/><br/>
                    Usługodawca zastrzega, że może nie zamieścić wpisów niezgodnych z prawem lub Regulaminem.
                    <br/><br/>
                    Usługodawca może w każdej chwili usunąć każdy wpis już zamieszczony w Serwisie bez podania przyczyny.
                    <br/><br/>
                    Usługodawca jest uprawniony do udzielania sublicencji.
                </div>

                <div className={styles.title}>
                    §11. <span className={styles.boldFont}>ODPOWIEDZIALNOŚĆ</span>
                </div>
                <div className={styles.smallText}>
                    Usługodawca zobowiązany jest świadczyć Usługi z należytą starannością.
                    <br/><br/>
                    W związku ze świadczonymi na rzecz Usługobiorcy Usługami Usługodawca nie ponosi odpowiedzialności z tytułu: trwałej albo czasowej niemożliwości świadczenia Usług oraz z tytułu nienależytego świadczenia Usług z przyczyn niezależnych od Usługodawcy, w tym na skutek wystąpienia siły wyższej, utraconych przez Usługobiorcę korzyści, trwałej albo czasowej niemożliwości świadczenia Usług oraz z tytułu nienależytego świadczenia Usług z przyczyn leżących po stronie osób trzecich, za pomocą których Usługi są świadczone, skutków nieprawidłowego wykorzystania świadczonych Usług, w szczególności w sposób sprzeczny z Regulaminem, Umową, naturą stosunku oraz zasadami współżycia społecznego, skutków udostępnienia przez Usługobiorcę jakichkolwiek treści osobom trzecim przy wykorzystaniu Usług, skutków wykorzystania informacji autoryzujących dostęp do Usług przez osoby trzecie, jeżeli osoby te weszły w posiadanie tych informacji na skutek ich ujawnienia przez Usługobiorcę albo na skutek niedostatecznego zabezpieczenia informacji przez Usługobiorcę przed dostępem takich osób, przerw w dostępności do Serwisu powstałych wskutek przerwy technicznej, wynikającej z rozwoju lub naprawy Serwisu, strat danych spowodowanych usunięciem konta przez Użytkownika.
                    Odpowiedzialność Usługodawcy względem Usługobiorcy w każdym przypadku ograniczona jest do wysokości opłaty rocznej, jaką Usługobiorca wnosi na rzecz Usługodawcy z tytułu świadczenia usługi.
                    <br/><br/>
                    W ramach świadczenia Usługi Usługodawca zastrzega możliwość wystąpienia przerw w zapewnieniu dostępności Serwisu. Wynikłe przerwy mogą być spowodowane aktualizowaniem Serwisu, koniecznością konserwacji lub usunięciem ewentualnych nieprawidłowości w działaniu Serwisu. Usługodawca podejmuje starania, aby terminy przerw były możliwie najmniej uciążliwe z punktu widzenia funkcjonowania Serwisu. Usługobiorca oświadcza, że wyraża zgodę na przerwy w dostępie do Serwisu w celu jego aktualizowania, wykonania konserwacji lub usunięcia przez Usługodawcę ewentualnych nieprawidłowości i że nie będzie wysuwał z tego tytułu jakichkolwiek roszczeń wobec Usługodawcy.
                </div>

                <div className={styles.title}>
                    §12. <span className={styles.boldFont}>DANE UŻYTKOWNIKA I ICH OCHRONA</span>
                </div>
                <div className={styles.smallText}>
                    Dane Usługobiorcy wprowadzone do Serwisu, stanowią własność Usługobiorcy.
                    <br/><br/>
                    Wszelkie dane Usługobiorcy i Użytkownika gromadzone i przetwarzane są przez Usługodawcę w celu prawidłowego, zgodnego z Regulaminem świadczenia Usług, w szczególności prawidłowego funkcjonowania Serwisu w zakresie właściwego wystawiania faktur, dokonywania przelewów, prawidłowego wypełniania deklaracji i innych dokumentów generowanych przez Serwis oraz w celu zapewnienia Usługobiorcy możliwości korzystania z dodatkowych narzędzi określonych w § 1 ust. 1 pkt p) oraz w celu dokonywania rozliczeń Usługodawcy z Usługobiorcą za świadczone Usługi.
                    <br/><br/>
                    Usługodawca podejmuje wszelkie niezbędne środki do ochrony danych osobowych Usługobiorcy, jego firmy i wszelkich innych danych wprowadzanych do Serwisu.
                    <br/><br/>
                    Na ochronę, o której mowa w ust. 3, składają się w szczególności:
                    <br/><br/>
                    System bezpieczeństwa transmisji danych - dane Usługobiorcy szyfrowane są przy użyciu klucza SSL (Secure Socket Layer) i praktycznie nie mogą być przechwycone i rozszyfrowane przez niepowołane osoby.
                    <br/><br/>
                    System kontroli dostępu do danych - tylko Usługobiorca ma dostęp do swoich danych, za pomocą ustalonego przez siebie hasła.
                    <br/><br/>
                    Ograniczony dostęp Usługodawcy - Usługodawca i zatrudnione przez niego osoby nie mają wglądu do danych Usługobiorcy, poza danymi niezbędnymi do świadczenia Usług.
                    <br/><br/>
                    System zabezpieczenia danych przed awarią urządzeń - wszelkie wprowadzone przez Usługobiorcę dane będą przechowywane w taki sposób, aby wyeliminować możliwość ich utraty w razie awarii sprzętu.
                    <br/><br/>
                    Usługodawca nie odpowiada za treść danych wprowadzanych do Serwisu przez Usługobiorcę.
                    <br/><br/>
                    Usługobiorca ma prawo wglądu do przechowywanych w Serwisie danych osobowych zarówno swoich, jak i swojej firmy, a także modyfikowania tych danych w każdej chwili.
                </div>

                <div className={styles.title}>
                    §13. <span className={styles.boldFont}>PRZETWARZANIE DANYCH OSOBOWYCH</span>
                </div>
                <div className={styles.smallText}>
                    W ramach świadczenia drogą elektroniczną Usług wymagających podania danych osobowych, Usługodawca jest uprawniony na podstawie art. 18 ust. 1 ustawy z dnia 18 lipca 2002 r. o świadczeniu usług drogą elektroniczną (Dz.U. z 2002 r., Nr 144, poz. 1204, z późń. zm.) do przetwarzania danych osobowych Usługobiorców niezbędnych do nawiązania, ukształtowania treści, zmiany lub rozwiązania Umowy o świadczenie Usług przez Usługodawcę oraz w celu prawidłowej realizacji Usług.
                    <br/><br/>
                    Informacje o danych osobowych przetwarzanych w serwisie oraz o Usługodawcy jako administratorze danych znajdują się w Polityce prywatności, stanowiącej załącznik do Regulaminu.
                    <br/><br/>
                    Dane osobowe wprowadzane do Serwisu, wobec których Usługobiorca jest Administratorem Danych, Usługodawca przetwarza na podstawie Umowy Powierzenia Przetwarzania stanowiącej załącznik do niniejszego Regulaminu.
                    <br/><br/>
                    Usługodawca może przetwarzać m.in. następujące dane osobowe Usługobiorców:
                    <br/><br/>
                    nazwisko i imiona;
                    <br/><br/>
                    numer ewidencyjny PESEL lub - gdy ten numer nie został nadany - numer paszportu, dowodu osobistego lub innego dokumentu potwierdzającego tożsamość;
                    <br/><br/>
                    adres zameldowania na pobyt stały;
                    <br/><br/>
                    adres do korespondencji, jeżeli jest inny niż adres, o którym mowa w pkt c);
                    <br/><br/>
                    dane służące do weryfikacji podpisu elektronicznego usługobiorcy;
                    <br/><br/>
                    adresy elektroniczne usługobiorcy.
                    <br/><br/>
                    W celu realizacji Umowy lub dokonania innej czynności prawnej z Usługobiorcą, Usługodawca może przetwarzać inne dane, niż wskazane w ust. 4, jeżeli jest to niezbędne ze względu na właściwość świadczonej Usługi lub sposób jej rozliczenia.
                    <br/><br/>
                    Usługodawca może przetwarzać również następujące dane charakteryzujące sposób korzystania przez Usługobiorcę z Serwisu (dane eksploatacyjne):
                    <br/><br/>
                    oznaczenia identyfikujące Usługobiorcę nadawane na podstawie danych, o których mowa w ust. 4 niniejszego paragrafu,
                    <br/><br/>
                    oznaczenia identyfikujące zakończenie sieci telekomunikacyjnej lub system teleinformatyczny, z którego korzystał Usługobiorca,
                    <br/><br/>
                    informacje o rozpoczęciu, zakończeniu oraz zakresie każdorazowego korzystania z Usług,
                    <br/><br/>
                    inne informacje o skorzystaniu przez Usługobiorcę z Usług.
                    <br/><br/>
                    W przypadku uzyskania przez Usługodawcę informacji o korzystaniu przez Usługobiorcę z Serwisu w sposób niezgodny z prawem, Regulaminem, Umową lub zasadami współżycia społecznego, Usługodawca może przetwarzać dane osobowe Usługobiorcy w celu i w zakresie potrzebnym do ustalenia odpowiedzialności Usługobiorcy.
                    <br/><br/>
                    Usługodawca jest administratorem danych osobowych lub podmiotem przetwarzającym dane w rozumieniu Rozporządzenia Parlamentu Europejskiego i Rady (UE) 2016/679 z dnia 27 kwietnia 2016 r. w sprawie ochrony osób fizycznych w związku z przetwarzaniem danych osobowych i w sprawie swobodnego przepływu takich danych oraz uchylenia dyrektywy 95/46/WE (ogólne rozporządzenie o ochronie danych zwane dalej Rozporządzeniem) udostępnianych przez Usługobiorców w celu świadczenia Usług. Usługodawca, jako administrator tych danych, dba o ich bezpieczeństwo, a w szczególności chroni je przed dostępem osób nieupoważnionych.
                    <br/><br/>
                    Udostępnienie przez Usługobiorcę swoich danych w celu świadczenia Usługi jest dobrowolne. Usługobiorca ma prawo do wglądu i modyfikacji swych danych osobowych.
                    <br/><br/>
                    Na podstawie motywu 47 Rozporządzenia w trakcie trwania Umowy (lub ogólniej, gdy realizowany jest cel, dla którego dane osobowe zostały powierzone), administrator może je również wykorzystywać na potrzeby akcji promocyjnych, reklamowych (marketingowych) własnych towarów lub usług i w tym zakresie nie musi pytać Usługobiorcy o zgodę.
                </div>

                <div className={styles.title}>
                    §14. <span className={styles.boldFont}>POSTĘPOWANIE REKLAMACYJNE</span>
                </div>
                <div className={styles.smallText}>
                    Reklamacje dotyczące Usług Usługobiorca może składać w formie pisemnej, za pomocą listu poleconego na adres siedziby Usługodawcy lub przy pomocy poczty elektronicznej na adres określony w § 16 ust. 5 Regulaminu.
                    <br/><br/>
                    Usługobiorca może złożyć reklamację w terminie 14 dni od dnia wystąpienia zdarzenia będącego przyczyną reklamacji.
                    <br/><br/>
                    Reklamacja musi zawierać dane Usługobiorcy umożliwiające nawiązanie z nim kontaktu, w tym dane umożliwiające identyfikację.
                    <br/><br/>
                    osoby składającej reklamację, jako Usługobiorcy;
                    <br/><br/>
                    konkretna Usługę, której reklamacja dotyczy;
                    <br/><br/>
                    zarzuty Usługobiorcy co do wskazanej Usługi;
                    <br/><br/>
                    okoliczności uzasadniające reklamację;
                    <br/><br/>
                    ewentualne żądanie Usługobiorcy związane ze złożoną reklamacją.
                    <br/><br/>
                    Reklamacje będą rozpatrywane w terminie 14 dni od dnia otrzymania listu poleconego lub wiadomości przesłanej pocztą elektroniczną przez Usługodawcę.
                    <br/><br/>
                    Usługodawca, rozpatrując reklamację, stosować będzie postanowienia Regulaminu.
                    <br/><br/>
                    O decyzji Usługodawcy Usługobiorca zostanie powiadomiony pisemnie na adres podany w liście poleconym zawierającym reklamację lub przy pomocy poczty elektronicznej.
                </div>

                <div className={styles.title}>
                    §15. <span className={styles.boldFont}>OKRES OBOWIĄZYWANIA UMOWY I JEJ ROZWIĄZANIE</span>
                </div>
                <div className={styles.smallText}>
                    Umowa o świadczenie Usługi zawierana jest na czas określony - równy Okresowi Abonamentowemu. Przedłużenie Okresu abonamentowego skutkuje przedłużeniem Umowy bez konieczności składania odrębnych oświadczeń woli. Umowa o świadczenie Usługi ulega rozwiązaniu na skutek:
                    <br/><br/>
                    nieprzedłużenia Okresu Abonamentowego danej Usługi zgodnie z postanowieniami Regulaminu,
                    <br/><br/>
                    śmierci Usługobiorcy,
                    <br/><br/>
                    ustania bytu prawnego Usługobiorcy,
                    <br/><br/>
                    usunięcia przez Usługobiorcę konta w Systemie.
                    <br/><br/>
                    Usługodawca uprawniony będzie do rozwiązania umowy o świadczenie danej Usługi w przypadku, gdy:
                    <br/><br/>
                    Usługobiorca istotnie naruszy postanowienia Umowy lub Regulaminu,
                    <br/><br/>
                    Usługobiorca będzie korzystał z Usługi niezgodnie z jej parametrami określonymi w Serwisie, przeznaczeniem Usługi lub zasadami współżycia społecznego.
                    <br/><br/>
                    Usługobiorca będzie działał na szkodę Usługodawcy, innych klientów Usługodawcy lub użytkowników sieci Internet,
                    <br/><br/>
                    Usługobiorca będzie dokonywał czynności niezgodnych z prawem lub działań zmierzających do naruszenia bezpieczeństwa danych znajdujących się w Serwisie.
                    <br/><br/>
                    Przed rozwiązaniem umowy Usługodawca wezwie Usługobiorcę do zaprzestania naruszeń, wyznaczając mu przy tym termin nie krótszy niż 14 dni na zaniechanie tych naruszeń. Wezwanie to może zostać złożone na piśmie lub za pośrednictwem poczty elektronicznej.
                    <br/><br/>
                    Rozwiązanie Umowy może zostać dokonane pisemnie lub za pośrednictwem poczty elektronicznej. 
                    <br/><br/>
                    W przypadku decyzji o zwrocie środków na konto Usługobiorcy, Usługodawca potrąca 50 zł tytułem kosztów operacyjnych dotyczących obsługi zwrotu środków, to jest wystawienia korekty, przeprowadzenia zwrotu środków z rachunku bankowego. Usługobiorca wyraża zgodę na potrącenie ww. kwoty, bez konieczności składania przez Usługodawcę odrębnego oświadczenia o potrąceniu. Warunkiem zwrotu środków jest usunięcie konta przez Usługobiorcę z Serwisu.
                </div>
                <div className={styles.title}>
                    §16. <span className={styles.boldFont}>POSTANOWIENIA KOŃCOWE</span>
                </div>
                <div className={styles.smallText}>
                    Regulamin jest udostępniony użytkownikom Serwisu nieodpłatnie za pośrednictwem Strony w formie, która umożliwia jego pobranie, utrwalenie i wydrukowanie.
                    <br/>                    
                    Każdy użytkownik Serwisu zobowiązany jest do przestrzegania postanowień Regulaminu od chwili rozpoczęcia korzystania z Usług.
                    <br/>                    
                    W przypadku zmiany Regulaminu aktualna jego wersja zostanie umieszczona w Serwisie virtoffice.pl wraz z jednoczesnym poinformowaniem Usługobiorców o fakcie udostępnienia nowej wersji Regulaminu drogą elektroniczną - za pośrednictwem wiadomości systemowych dostępnych na koncie Użytkownika.
                    <br/>                    
                    Usługodawca zastrzega sobie prawo zmian Regulaminu jak i załączników do Regulaminu z ważnych przyczyn, w szczególności w przypadku zmiany przepisów prawa, wprowadzenia nowych funkcjonalności lub rozpoczęcia świadczenia nowych Usług, zmiany warunków technicznych świadczenia Usług, zmiany warunków świadczonych przez osoby trzecie usług na rzecz Usługodawcy niezbędnych do świadczenia Usług, zmian organizacyjnych lub przekształceń prawnych z tym zastrzeżeniem, że zmiana wyłącznie w zakresie formy prawnej Usługodawcy lub zmiana firmy nie stanowi zmiany Umowy. Zmiany te obowiązują od chwili udostępnienia nowej wersji Regulaminu w Serwisie.
                    <br/>                    
                    Wszelkie pytania, opinie i wnioski dotyczące funkcjonowania Serwisu oraz oświadczenia do Usługodawcy Usługobiorca może kierować na wskazany poniżej adres poczty elektronicznej: biuro@virtoffice.pl.
                    <br/>                    
                    Załączniki do Regulaminu głównego stanowią jego integralną część. Zmiana załączników do Regulaminu głównego nie stanowi jego zmiany
                    <br/>                    
                    Załączniki stanowiące integralną część Regulaminu głównego:
                    <br/>                    
                    Polityka prywatności
                    <br/>                    
                    Umowa powierzenia przetwarzania danych osobowych.
                    <br/>                    
                    <br/>    
                    Regulamin wchodzi w życie z dniem 01 czerwca 2021 r.

                </div>
            </div>
                
            <Footer auth={auth}/>
        </div>
    )
}

export default Regulamin
