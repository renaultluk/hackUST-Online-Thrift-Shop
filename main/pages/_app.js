import TempNavbar from "../src/components/tempNavbar"
import  AuthProvider from "../src/contexts/AuthContext" 
import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <AuthProvider>
        <TempNavbar />
        <Component {...pageProps} />
      </AuthProvider>
    </>

  
  )
}

export default MyApp
