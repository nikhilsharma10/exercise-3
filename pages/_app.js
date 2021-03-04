import CustomLayout from '../components/CustomLayout'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <CustomLayout>
      <Component {...pageProps} />
    </CustomLayout>
  )
}

export default MyApp
