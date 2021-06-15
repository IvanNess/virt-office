import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import MojeRezerwacje from '../../moje-rezerwacje'
import Pakiet from '../../pakiet'
import Dane from '../../profil'
import Rezervacja from '../../rezerwacja'
import Rozliczenia from '../../rozliczenia'
import { setLanguage } from '../../../../redux/actions'

const MainPage = ({params, auth, db}) => {

    const [pagename, setPagename] = useState()

    const dispatch = useDispatch()

    useEffect(()=>{
        console.log('useEffect params', params)
        setPagename(params.pagename)
        dispatch(setLanguage(params.lang))
    }, [params])

    return(
        <>
            {pagename === 'moje-rezerwacje' && <MojeRezerwacje auth={auth} db={db}/>}
            {pagename === 'pakiet' && <Pakiet auth={auth} db={db}/>}
            {pagename === 'profil' && <Dane auth={auth} db={db}/>}
            {pagename === 'rezerwacja' && <Rezervacja auth={auth} db={db}/>}
            {pagename === 'rozliczenia' && <Rozliczenia auth={auth} db={db}/>}
        </>
    )
}

export async function getStaticPaths() {
    // const paths= [
    //     {params: { lang: 'en', pagename: 'cennik'}},
    //     {params: { lang: 'pl', pagename: 'cennik'}},
    //     {params: { lang: 'ua', pagename: 'cennik'}},
    //     {params: { lang: 'en', pagename: 'ksiegowosc'}},
    //     {params: { lang: 'pl', pagename: 'ksiegowosc'}},
    //     {params: { lang: 'ua', pagename: 'ksiegowosc'}},
    // ]

    const initPaths= [
        {params: { pagename: 'moje-rezerwacje'}},
        {params: { pagename: 'pakiet'}},
        {params: { pagename: 'profil'}},
        {params: { pagename: 'rezerwacja'}},
        {params: { pagename: 'rozliczenia'}},
    ]

    const languages = ['pl', 'ua', 'en']

    const paths = languages.reduce((res, language)=>{
        const updPaths = initPaths.map(path=>({params: {...path.params, lang: language}}))
        return [...res, ...updPaths]
    }, [])

    console.log('paths', paths)
    
    return { paths, fallback: false }
}
  

export async function getStaticProps({ params }) {
    console.log('params', params)
    // Pass post data to the page via props
    return { props: { params } }
  }

export default MainPage
