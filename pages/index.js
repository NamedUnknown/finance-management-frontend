import Navbar from "../components/Navbar";
import { ThemeProvider, createTheme } from '@mui/material/styles';

import Box from "@mui/material/Box"

function App() {
  const theme = createTheme({
    typography: {
      fontSize: 12,
    },
    palette: {
      primary: {
        main: "#403ffc",
        dark: "#5956f3"
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
      <Box sx={{ height: "100vh", backgroundColor: "#0a0b1b" }}>
        <Navbar />
      </Box>
    </ThemeProvider>
  )
}

export default App;
