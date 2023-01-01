import '../styles/globals.css'
import { Provider } from "react-redux";
import { store } from "../store/store";
import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';


function FinanceManagerFrontend({ Component, pageProps }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const jwt = sessionStorage.getItem("jwt");
    if (jwt != null) {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <div className="h-full bg-[#0a0b1b] pb-16 min-h-screen">
      <Provider store={store}>
        <Navbar isAuthenticated={isAuthenticated} />
        <Component {...pageProps} />
      </Provider>
    </div>
  )
}

export default FinanceManagerFrontend;