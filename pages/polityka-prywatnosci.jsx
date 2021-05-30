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

function Polityka({auth}) {
    const Hyphen = ()=> <span className={styles.hyphen}>&mdash;&mdash;&mdash;&mdash;&mdash;</span>

    return (
        <div className={styles.polityka}>
            <Sidebar auth={auth}/>

            <Line/>

            <Billboard>
                <Header/>
                <div className={styles.headerTitle}>
                    <div className={styles.headerBoldFont}>Polityka prywatności</div>
                </div>
                <div className={styles.headerText}>
                    Polityka prywatności opisuje zasady przetwarzania przez nas informacji na Twój temat, w tym danych osobowych oraz ciasteczek, czyli tzw. cookies.
                </div>
                {/* <WynajmijButton/> */}
            </Billboard>
            
            <div className={styles.mainWrapper} style={{margin: 'auto', maxWidth: '1440px'}}>

                <div className={styles.title}>
                    1. <span className={styles.boldFont}>Informacje ogólne</span>
                </div>

                <div className={styles.smallText}>
                    <ol>
                        <li>Niniejsza polityka dotyczy Serwisu www, funkcjonującego pod adresem url: <Link href='/'><a>virtoffice.pl</a></Link></li>
                        <li>Operatorem serwisu oraz Administratorem danych osobowych jest: HRex&nbsp;Sp.&nbsp;z&nbsp;o.o. z&nbsp;siedzibą w&nbsp;Gdańsku (80-726), ul.&nbsp;Zawodzie&nbsp;20, NIP&nbsp;5833188734, KRS&nbsp;0000586207.</li>
                        <li>Adres kontaktowy poczty elektronicznej operatora: biuro@hrex.eu</li>
                        <li>Operator jest Administratorem Twoich danych osobowych w odniesieniu do danych podanych dobrowolnie w Serwisie.</li>
                        <li>Serwis wykorzystuje dane osobowe w następujących celach:
                            <ul>
                                <li>Przygotowanie, pakowanie, wysyłka towarów</li>
                                <li>Realizacja zamówionych usług</li>
                            </ul>
                        </li>
                        <li>Serwis realizuje funkcje pozyskiwania informacji o użytkownikach i ich zachowaniu w następujący sposób:
                            <ul>
                                <li>Poprzez dobrowolnie wprowadzone w formularzach dane, które zostają wprowadzone do systemów Operatora.</li>
                                <li>Poprzez zapisywanie w urządzeniach końcowych plików cookie (tzw. „ciasteczka”).</li>
                            </ul>
                        </li>
                    </ol>
                </div>

                <div className={styles.title}>
                    2. <span className={styles.boldFont}>Wybrane metody ochrony danych stosowane przez Operatora</span>
                </div>

                <div className={styles.smallText}>
                    <ol>
                        <li>Miejsca logowania i wprowadzania danych osobowych są chronione w warstwie transmisji (certyfikat SSL). Dzięki temu dane osobowe i dane logowania, wprowadzone na stronie, zostają zaszyfrowane w komputerze użytkownika i mogą być odczytane jedynie na docelowym serwerze.</li>
                        <li>Hasła użytkowników są przechowywane w postaci hashowanej. Funkcja hashująca działa jednokierunkowo - nie jest możliwe odwrócenie jej działania, co stanowi obecnie współczesny standard w zakresie przechowywania haseł użytkowników.</li>
                        <li>Operator okresowo zmienia swoje hasła administracyjne.</li>
                        <li>W celu ochrony danych Operator regularnie wykonuje kopie bezpieczeństwa.</li>
                        <li>Istotnym elementem ochrony danych jest regularna aktualizacja wszelkiego oprogramowania, wykorzystywanego przez Operatora do przetwarzania danych osobowych, co w szczególności oznacza regularne aktualizacje komponentów programistycznych.</li>
                    </ol>
                </div>

                <div className={styles.title}>
                    3. <span className={styles.boldFont}>Hosting</span>
                </div>

                <div className={styles.smallText}>
                    <ol>
                        <li>Serwis jest hostowany (technicznie utrzymywany) na serwera operatora: <Link href='https://home.pl'><a>home.pl</a></Link></li>
                    </ol>
                </div>

                <div className={styles.title}>
                    4. <span className={styles.boldFont}>Twoje prawa i dodatkowe informacje o sposobie wykorzystania danych</span>
                </div>

                <div className={styles.smallText}>
                    <ol>
                        <li>W niektórych sytuacjach Administrator ma prawo przekazywać Twoje dane osobowe innym odbiorcom, jeśli będzie to niezbędne do wykonania zawartej z Tobą umowy lub do zrealizowania obowiązków ciążących na Administratorze. Dotyczy to takich grup odbiorców:
                            <ul>
                                <li>firma hostingowa na zasadzie powierzenia</li>
                                <li>kurierzy</li>
                                <li>operatorzy pocztowi</li>
                                <li>operatorzy płatności</li>
                                <li>upoważnieni pracownicy i współpracownicy, którzy korzystają z danych w celu realizacji celu działania strony</li>
                            </ul>
                        </li>
                        <li>Twoje dane osobowe przetwarzane przez Administratora nie dłużej, niż jest to konieczne do wykonania związanych z nimi czynności określonych osobnymi przepisami (np. o prowadzeniu rachunkowości). W odniesieniu do danych marketingowych dane nie będą przetwarzane dłużej niż przez 3 lata.</li>
                        <li>Przysługuje Ci prawo żądania od Administratora:
                            <ul>
                                <li>dostępu do danych osobowych Ciebie dotyczących,</li>
                                <li>ich sprostowania,</li>
                                <li>usunięcia,</li>
                                <li>ograniczenia przetwarzania,</li>
                                <li>oraz przenoszenia danych.</li>
                            </ul>
                        </li>
                        <li>Przysługuje Ci prawo do złożenia sprzeciwu w zakresie przetwarzania wskazanego w pkt 3.3 c) wobec przetwarzania danych osobowych w celu wykonania prawnie uzasadnionych interesów realizowanych przez Administratora, w tym profilowania, przy czym prawo sprzeciwu nie będzie mogło być wykonane w przypadku istnienia ważnych prawnie uzasadnionych podstaw do przetwarzania, nadrzędnych wobec Ciebie interesów, praw i wolności, w szczególności ustalenia, dochodzenia lub obrony roszczeń.</li>
                        <li>Na działania Administratora przysługuje skarga do Prezesa Urzędu Ochrony Danych Osobowych, ul. Stawki 2, 00-193 Warszawa.</li>
                        <li>Podanie danych osobowych jest dobrowolne, lecz niezbędne do obsługi Serwisu.</li>
                        <li>W stosunku do Ciebie mogą być podejmowane czynności polegające na zautomatyzowanym podejmowaniu decyzji, w tym profilowaniu w celu świadczenia usług w ramach zawartej umowy oraz w celu prowadzenia przez Administratora marketingu bezpośredniego.</li>
                        <li>Dane osobowe nie są przekazywane od krajów trzecich w rozumieniu przepisów o ochronie danych osobowych. Oznacza to, że nie przesyłamy ich poza teren Unii Europejskiej.</li>
                    </ol>
                </div>

                <div className={styles.title}>
                    5. <span className={styles.boldFont}>Informacje w formularzach</span>
                </div>

                <div className={styles.smallText}>
                    <ol>
                        <li>Serwis zbiera informacje podane dobrowolnie przez użytkownika, w tym dane osobowe, o ile zostaną one podane.</li>
                        <li>Serwis może zapisać informacje o parametrach połączenia (oznaczenie czasu, adres IP).</li>
                        <li>Serwis, w niektórych wypadkach, może zapisać informację ułatwiającą powiązanie danych w formularzu z adresem e-mail użytkownika wypełniającego formularz. W takim wypadku adres e-mail użytkownika pojawia się wewnątrz adresu url strony zawierającej formularz.</li>
                        <li>Dane podane w formularzu są przetwarzane w celu wynikającym z funkcji konkretnego formularza, np. w celu dokonania procesu obsługi zgłoszenia serwisowego lub kontaktu handlowego, rejestracji usług itp. Każdorazowo kontekst i opis formularza w czytelny sposób informuje, do czego on służy.</li>
                    </ol>
                </div>

                <div className={styles.title}>
                    6. <span className={styles.boldFont}>Logi Administratora</span>
                </div>

                <div className={styles.smallText}>
                    <ol>
                        <li>Informacje zachowaniu użytkowników w serwisie mogą podlegać logowaniu. Dane te są wykorzystywane w celu administrowania serwisem.</li>
                    </ol>
                </div>

                <div className={styles.title}>
                    7. <span className={styles.boldFont}>Istotne techniki marketingowe</span>
                </div>

                <div className={styles.smallText}>
                    <ol>
                        <li>Operator stosuje analizę statystyczną ruchu na stronie, poprzez Google Analytics (Google Inc. z siedzibą w USA). Operator nie przekazuje do operatora tej usługi danych osobowych, a jedynie zanonimizowane informacje. Usługa bazuje na wykorzystaniu ciasteczek w urządzeniu końcowym użytkownika. W zakresie informacji o preferencjach użytkownika gromadzonych przez sieć reklamową Google użytkownik może przeglądać i edytować informacje wynikające z plików cookies przy pomocy narzędzia: <Link href='https://www.google.com/ads/preferences/'><a>https://www.google.com/ads/preferences/</a></Link></li>
                        <li>Operator stosuje techniki remarketingowe, pozwalające na dopasowanie przekazów reklamowych do zachowania użytkownika na stronie, co może dawać złudzenie, że dane osobowe użytkownika są wykorzystywane do jego śledzenia, jednak w praktyce nie dochodzi do przekazania żadnych danych osobowych od Operatora do operatorom reklam. Technologicznym warunkiem takich działań jest włączona obsługa plików cookie.</li>
                        <li>Operator stosuje korzysta z piksela Facebooka. Ta technologia powoduje, że serwis Facebook (Facebook Inc. z siedzibą w USA) wie, że dana osoba w nim zarejestrowana korzysta z Serwisu. Bazuje w tym wypadku na danych, wobec których sam jest administratorem, Operator nie przekazuje od siebie żadnych dodatkowych danych osobowych serwisowi Facebook. Usługa bazuje na wykorzystaniu ciasteczek w urządzeniu końcowym użytkownika.</li>
                    </ol>
                </div>

                <div className={styles.title}>
                    8. <span className={styles.boldFont}>Informacja o plikach cookies</span>
                </div>

                <div className={styles.smallText}>
                    <ol>
                        <li>Serwis korzysta z plików cookies.</li>
                        <li>Pliki cookies (tzw. „ciasteczka”) stanowią dane informatyczne, w szczególności pliki tekstowe, które przechowywane są w urządzeniu końcowym Użytkownika Serwisu i przeznaczone są do korzystania ze stron internetowych Serwisu. Cookies zazwyczaj zawierają nazwę strony internetowej, z której pochodzą, czas przechowywania ich na urządzeniu końcowym oraz unikalny numer.</li>
                        <li>Podmiotem zamieszczającym na urządzeniu końcowym Użytkownika Serwisu pliki cookies oraz uzyskującym do nich dostęp jest operator Serwisu.</li>
                        <li>Pliki cookies wykorzystywane są w następujących celach:
                            <ol>
                                <li>utrzymanie sesji użytkownika Serwisu (po zalogowaniu), dzięki której użytkownik nie musi na każdej podstronie Serwisu ponownie wpisywać loginu i hasła;</li>
                                <li>realizacji celów określonych powyżej w części "Istotne techniki marketingowe";</li>
                            </ol>
                        </li>
                        <li>W ramach Serwisu stosowane są dwa zasadnicze rodzaje plików cookies: „sesyjne” (session cookies) oraz „stałe” (persistent cookies). Cookies „sesyjne” są plikami tymczasowymi, które przechowywane są w urządzeniu końcowym Użytkownika do czasu wylogowania, opuszczenia strony internetowej lub wyłączenia oprogramowania (przeglądarki internetowej). „Stałe” pliki cookies przechowywane są w urządzeniu końcowym Użytkownika przez czas określony w parametrach plików cookies lub do czasu ich usunięcia przez Użytkownika.</li>
                        <li>Oprogramowanie do przeglądania stron internetowych (przeglądarka internetowa) zazwyczaj domyślnie dopuszcza przechowywanie plików cookies w urządzeniu końcowym Użytkownika. Użytkownicy Serwisu mogą dokonać zmiany ustawień w tym zakresie. Przeglądarka internetowa umożliwia usunięcie plików cookies. Możliwe jest także automatyczne blokowanie plików cookies Szczegółowe informacje na ten temat zawiera pomoc lub dokumentacja przeglądarki internetowej.</li>
                        <li>Ograniczenia stosowania plików cookies mogą wpłynąć na niektóre funkcjonalności dostępne na stronach internetowych Serwisu.</li>
                        <li>Pliki cookies zamieszczane w urządzeniu końcowym Użytkownika Serwisu wykorzystywane mogą być również przez współpracujące z operatorem Serwisu podmioty, w szczególności dotyczy to firm: Google (Google Inc. z siedzibą w USA), Facebook </li>
                    </ol>
                </div>

                <div className={styles.title}>
                    9. <span className={styles.boldFont}>Zarządzanie plikami cookies – jak w praktyce wyrażać i cofać zgodę?</span>
                </div>

                <div className={styles.smallText}>
                    <ol>
                        <li>Jeśli użytkownik nie chce otrzymywać plików cookies, może zmienić ustawienia przeglądarki. Zastrzegamy, że wyłączenie obsługi plików cookies niezbędnych dla procesów uwierzytelniania, bezpieczeństwa, utrzymania preferencji użytkownika może utrudnić, a w skrajnych przypadkach może uniemożliwić korzystanie ze stron www</li>
                        <li>W celu zarządzania ustawienia cookies wybierz z listy poniżej przeglądarkę internetową, której używasz i postępuj zgodnie z instrukcjami:
                            <ul>
                                <li>Edge</li>
                                <li>Internet Explorer</li>
                                <li>Chrome</li>
                                <li>Safari</li>
                                <li>Firefox</li>
                                <li>Opera</li>
                            </ul>
                            Urządzenia mobilne:
                            <ul>
                                <li>Android</li>
                                <li>Safari (iOS)</li>
                                <li>Windows Phone</li>
                            </ul>
                        </li>
                    </ol>
                </div>
                   
            </div>
                
            <Footer/>
        </div>
    )
}

export default Polityka
