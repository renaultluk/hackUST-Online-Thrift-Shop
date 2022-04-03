import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../styles/globals.css'
import Layout from '../components/layout'
import  AuthProvider from "../utils/AuthContext"

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AuthProvider>
  );
}

export default MyApp
