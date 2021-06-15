import React, { useEffect, useState } from 'react'
import Cennik from '../../cennik'
import { useDispatch } from 'react-redux'
import { setLanguage } from '../../../redux/actions'
import Ksiegowosc from '../../ksiegowosc'
import Wynajecie from '../../wynajecie'
import Home from '../..'
import Regulamin from '../../regulamin'
import Polityka from '../../polityka-prywatnosci'

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
            {pagename === 'cennik' && <Cennik auth={auth} db={db}/>}
            {pagename === 'ksiegowosc' && <Ksiegowosc auth={auth} db={db}/>}
            {pagename === 'home' && <Home auth={auth} db={db}/>}
            {pagename === 'wynajecie' && <Wynajecie auth={auth} db={db}/>}
            {pagename === 'regulamin' && <Regulamin auth={auth} db={db}/>}
            {pagename === 'polityka-prywatnosci' && <Polityka auth={auth} db={db}/>}
        </>
    )
}

export async function getStaticPaths() {
    // const paths= [
    //     {params: { lang: 'en', pagename: 'cennik'}},
    //     {params: { lang: 'pl', pagename: 'cennik'}},
    // ]

    const initPaths= [
        {params: { pagename: 'cennik'}},
        {params: { pagename: 'ksiegowosc'}},
        {params: { pagename: 'home'}},
        {params: { pagename: 'wynajecie'}},
        {params: { pagename: 'regulamin'}},
        {params: { pagename: 'polityka-prywatnosci'}},

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
