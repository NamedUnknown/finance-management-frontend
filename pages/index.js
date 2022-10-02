import { useState } from "react";
import Navbar from "../components/Navbar";
import Home from "./home";
import Styles from "../styles/App.module.css";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { withRouter, useRouter } from 'next/router'

function App() {
  const router = useRouter();

  const theme = createTheme({
    typography: {
      fontSize: 12,
    },
    palette: {
      primary: {
        main: "#403ffc",
        light: "#5956f3",
      },
      secondary: {
        dark: "#fc635a",
        main: "#fe9339",
      },
      background: {
        main: "#0a0b1b",
        accent: "#272730",
        light: "#434250"
      },
      //contrastThreshold: 3,
      //tonalOffset: 0.2,
    },
  });

  const [isAuthenticated, setAuth] = useState(router.query.user != null && router.query.user != "");
  const [user, setUser] = useState((router.query.user == "" || router.query.user == null) ? {} : JSON.parse(router.query.user));

  return (
    <ThemeProvider theme={theme}>
      <div className={Styles.app_container}>
        <Navbar user={user} isAuthenticated={isAuthenticated} />
        <Home user={user} isAuthenticated={isAuthenticated} />
      </div>
    </ThemeProvider>
  )
}

export default withRouter(App)
