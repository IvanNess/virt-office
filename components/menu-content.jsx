import React, { useEffect, useRef } from 'react'
import TwitterIcon from '@material-ui/icons/Twitter'
import FacebookIcon from '@material-ui/icons/Facebook'
import InstagramIcon from '@material-ui/icons/Instagram'
import CloseIcon from '@material-ui/icons/Close'

import styles from '../styles/MenuContent.module.scss'
// import { Link } from 'next/link'
import { useDispatch, useSelector } from 'react-redux'
import { setShowAuth, setShowMenu, logoutAction } from '../redux/actions'
import { useClickOutside } from 'react-click-outside-hook'
import axios from 'axios'
import Logo from './logo'
import Link from 'next/link'
import { email, phrases, buttonNames } from '../accessories/constants'
import useWindowWidth from '../hooks/useWindowWidth'

// Hook
function useOnClickOutside(ref, handler) {
    useEffect(
      () => {
        const listener = (event) => {
            console.log('clicked', event.target, event.target.classList.value)
          // Do nothing if clicking ref's element or descendent elements
          if( event.target.parentNode.classList.value === 'MuiSvgIcon-root' 
            || event.target.classList.value === 'MuiSvgIcon-root'
            || event.target.classList.value.includes('Sidebar_menuIcons_')
          )
            return
          if (!ref.current || ref.current.contains(event.target)) {
            return;
          }
          handler(event);
        };
        document.addEventListener("mousedown", listener);
        document.addEventListener("touchstart", listener);
        return () => {
          document.removeEventListener("mousedown", listener);
          document.removeEventListener("touchstart", listener);
        };
      },
      // Add ref and handler to effect dependencies
      // It's worth noting that because passed in handler is a new ...
      // ... function on every render that will cause this effect ...
      // ... callback/cleanup to run every render. It's not a big deal ...
      // ... but to optimize you can wrap handler in useCallback before ...
      // ... passing it into this hook.
      [ref, handler]
    );
}

const MenuContent = ({auth}) => {

    const dispatch = useDispatch()
    const language = useSelector(state=>state.language)

    const windowWidth = useWindowWidth()
    const ref = useRef();

    useEffect(()=>{
        console.log('menu context auth', auth)
        async function fetchReservedSessions(){
            const data = await axios({
                url: "/api/reservedsessions",
                method: "POST",
                data: {
                    year: "2021",
                    month: "02",
                    day: "22"
                }
            })
            console.log(data)
        }
        // fetchReservedSessions()
    }, [])

    const showAuth = useSelector(state=>state.showAuth)
    // const [ref, hasClickedOutside] = useClickOutside()
    const currentUser = useSelector(state=>state.currentUser)

    function onAuth(isLogin){
        dispatch(setShowAuth({show: true, isLogin}))
        dispatch(setShowMenu(false))
        const body = document.querySelector("body")
        body.style.overflow = "hidden"
    }

    // useEffect(() => {
    //     if(hasClickedOutside){
    //         dispatch(setShowMenu(false))
    //     }
    // }, [hasClickedOutside])

    useOnClickOutside(ref, () => dispatch(setShowMenu(false)));

    async function logout(){
        try {
            await auth.signOut()
            // router.push('/')
            dispatch(logoutAction())
            dispatch(setShowMenu(false))
        } catch (error) {
            console.log(error)
        }
    }

    function linkClicked(){
        dispatch(setShowMenu(false))
    }

    return (
        <div className={styles.menuContent} ref={ref}>
            <div className={styles.iconsWrapper}>
                <Link href="/"><a>
                    <div onClick={linkClicked}>
                        <Logo scale={useWindowWidth>=700 ? 1 : 0.6}/>
                    </div>
                </a></Link>
                <div className={styles.icons}>
                    <Link href="/"><a><div><TwitterIcon style={{fontSize: '27px', color: '#FFFFFF'}}/></div></a></Link>
                    <Link href="/"><a><div><FacebookIcon style={{fontSize: '27px', color: '#FFFFFF'}}/></div></a></Link>
                    <Link href="/"><a><div><InstagramIcon style={{fontSize: '27px', color: '#FFFFFF'}}/></div></a></Link>
                </div>
                <div className={styles.closeIcon} onClick={linkClicked} >
                    <CloseIcon style={{fontSize: '70px', color: "white"}}/>
                </div>
            </div>

            <div className={styles.textOne}>{phrases[language]?.menuContentText1}</div>

            <div className={styles.textTwo}>{phrases[language]?.menuContentText2}
                <a href={`mailto:${email}`}><span className={styles.bold}>{email}</span></a>
            </div>

            <div className={styles.options}>
                {/* <div><Link href="/onas"><a><h2 onClick={linkClicked}>o nas</h2></a></Link></div> */}
                <div><Link href="/cennik"><a><h2 onClick={linkClicked}>{buttonNames[language]?.prices}</h2></a></Link></div>
                <div><Link href="/ksiegowosc"><a><h2 className={styles.last} onClick={linkClicked}>{buttonNames[language]?.accounting}</h2></a></Link></div>
                {/* <div><Link href="/regulamin"><a><h2 onClick={linkClicked}>regulamin</h2></a></Link></div>
                <div><Link href="/polityka-prywatnosci"><a><h2 onClick={linkClicked}>polityka prywatności</h2></a></Link></div> */}
                {!currentUser && <div><Link href="/#wynajmij-biuro"><a><h2 className={styles.wynajmijBiuro} onClick={linkClicked}>Wynajmij biuro na godziny</h2></a></Link></div>}
                {/* <div><Link href="/podpis"><a><h2>wirtualny podpis</h2></a></Link></div> */}

                {currentUser && 
                    <div className={styles.profilLinks}>
                        <div><Link href="/konto/profil"><a><h2 className={styles.profilLink} onClick={linkClicked}>{buttonNames[language]?.menuProfile}</h2></a></Link></div>
                        <div><Link href="/konto/pakiet"><a><h2 className={styles.profilLink} onClick={linkClicked}>{buttonNames[language]?.meuPakiet}</h2></a></Link></div>
                        <div><Link href="/konto/rozliczenia"><a><h2 className={styles.profilLink} onClick={linkClicked}>{buttonNames[language]?.menuRozliczenia}</h2></a></Link></div>
                        <div><Link href="/konto/rezerwacja"><a><h2 className={styles.profilLink} onClick={linkClicked}>{buttonNames[language]?.menuRezerwacja}</h2></a></Link></div>
                        <div><Link href="/konto/moje-rezerwacje"><a><h2 className={styles.profilLink} onClick={linkClicked}>&nbsp;&nbsp;&nbsp; {buttonNames[language]?.menuMyReservations}</h2></a></Link></div>
                    </div>
                }

                <div className={styles.split}></div>

                {currentUser===false && <div onClick={()=>onAuth(true)}>
                    <h2 className={styles.first}>{buttonNames[language]?.login2}</h2>
                </div>}
                {currentUser===false && <div onClick={()=>onAuth(false)}>
                    <h2>{buttonNames[language]?.register}</h2>
                </div>}

                {currentUser && 
                    <div onClick={logout}>
                        <h2 className={styles.first}>{buttonNames[language]?.logout}</h2 >
                    </div>
                }

                {/* <Link href="/pakiety"><a><h2>pakiety</h2></a></Link>
                
                <Link href="/localizacje"><a><h2 className={styles.last}>localizacje</h2></a></Link> */}
            </div>

            {/* <div className={styles.cities}>
                <div className={styles.cityWrapper}><p>Poznań</p></div>
                <div className={styles.cityWrapper}><p>Warszawa</p></div>
                <div className={styles.cityWrapper}><p>Kraków</p></div>
                <div className={styles.cityWrapper}><p>Gdańsk</p></div>
                <div className={styles.cityWrapper}><p>Gdynia</p></div>
                <div className={styles.cityWrapper}><p>Toruń</p></div>
                <div className={styles.cityWrapper}><p>Sandomierz</p></div>
                <div className={styles.cityWrapper}><p>Sopot</p></div>
                <div className={styles.cityWrapper}><p>Tczew</p></div>          
            </div> */}
        </div>
    )
}

export default MenuContent
