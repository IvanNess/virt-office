import '../styles/globals.css'
import Footer from '../components/footer'
import { Provider } from 'react-redux';
import { useStore } from '../redux/store';

import fire from '../firebase'
import AuthBoilerplate from '../components/auth-boilerplate';

function MyApp({ Component, pageProps }) {

  const store = useStore(pageProps.initialReduxState)

  const db = fire.firestore()
  const auth = fire.auth()

  return (
    <>
      <Provider store={store}>
        <Component {...pageProps} db={db} auth={auth}/>  
        <Footer/>
        <AuthBoilerplate/>
      </Provider>
    </>
  )
}

export default MyApp
