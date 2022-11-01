import '../styles/globals.css'
import { Provider } from "react-redux";
import { store } from "../store/store";
import { SessionProvider } from "next-auth/react"

function FinanceManagerFrontend({ Component, pageProps }) {
  return (
    <>
      <SessionProvider session={pageProps.session}>
        <Provider store={store}>
          <Component {...pageProps} />
        </ Provider>
      </SessionProvider>
    </>
  )
}

export default FinanceManagerFrontend;