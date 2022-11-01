/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    theme: {
      colors: {
        primary: "#403ffc",
        "primary-dark": "#3332C9",
        "primary-light": "#6665FC",
        secondary: "#fc635a",
        "secondary-dark": "#C94F48",
        "secondary-light": "#FC827B",
        background: "#0a0b1b",
        "background-light": "#222331",
        accent: "#272730"
      },
      screens: {
        phone: "640px",
        tablet: "960px",
        laptop: "1280px",
        desktop: "1920px"
      }
    },
    extend: {},
  },
  plugins: [],
}

// const theme = createTheme({
  //   typography: {
  //     fontSize: 12,
  //   },
  //   palette: {
  //     background: {
  //       main: "#0a0b1b",
  //       accent: "#272730",
  //       light: "#434250"
  //     },
  //   },
  // });
