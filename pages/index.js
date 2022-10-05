import { useState } from "react";
import Navbar from "../components/Navbar";
import Home from "./home";
import Styles from "../styles/App.module.css";
import { ThemeProvider, createTheme } from '@mui/material/styles';

function App(store) {
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
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <div className={Styles.app_container}>
        <Navbar />
        <Home />
      </div>
    </ThemeProvider>
  )
}

export default App;
