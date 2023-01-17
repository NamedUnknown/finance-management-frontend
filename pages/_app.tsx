import '../styles/globals.css'
import Navbar from '../components/Navbar';


function FinanceManagerFrontend({ Component, pageProps }) {
  return (
    <div className="h-full bg-[#0a0b1b] pb-16 min-h-screen">
        <Navbar />
        <Component {...pageProps} />
    </div>
  )
}

export default FinanceManagerFrontend;