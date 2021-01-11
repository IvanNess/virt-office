import '../styles/globals.css'
import Footer from '../components/footer'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />  
      <Footer/>
    </>
  )
}

export default MyApp
