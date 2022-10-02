import React from "react";
import Styles from "../styles/Login.module.css"
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import { createTheme } from "@mui/material/styles";
import Loading from "../components/Loading"
import router from 'next/router'


export default class Login extends React.Component {

  theme = createTheme({
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

  constructor(props) {
    super(props);
    this.state = {
      showPassword: false,
      password: "1234",
      email: "marchel0925.dev@gmail.com",
      isLoading: false
    }
  }

  onLogin = async () => {
    try {
      this.setState({ ...this.state, isLoading: true });
      const response = await fetch(process.env.springboot + "/login", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "login-form": JSON.stringify({
            email: this.state.email,
            password: this.state.password
          })
        },
      });
      const body = await response.json();
      router.replace({
        pathname: "/", query: {
          user: JSON.stringify(
            {
              id: body.id,
              name: body.name,
              surname: body.surname,
              email: body.email,
              monthlyIncome: body.monthlyIncome,
              savings: body.savings
            }
          )
        }
      });
      this.setState({ ...this.state, isLoading: false });
    } catch (err) {
      console.log(err);
    } finally {
      this.setState({ ...this.state, isLoading: false });
    }
  };

  handleChange = (prop) => (event) => {
    this.setState({ ...this.state, [prop]: event.target.value });
  };

  handleClickShowPassword = () => {
    this.setState({
      ...this.state,
      showPassword: !this.state.showPassword,
    });
  };

  handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  render() {
    if (this.state.isLoading) {
      return <Loading theme={this.theme} />;
    } else {
      return (
        <div className={Styles.login_container}>
          <div className={Styles.login_form}>
            <FormControl variant="outlined" sx={{ width: "100%" }} theme={this.theme}>
              <InputLabel htmlFor="email-input">Email address</InputLabel>
              <OutlinedInput
                sx={{ borderRadius: "15px" }}
                id="email-input"
                type="text"
                className={Styles.email_text_field}
                value={this.state.email}
                label="Email address"
                onChange={this.handleChange("email")} />
            </FormControl>
            <FormControl variant="outlined" sx={{ width: "100%" }} theme={this.theme}>
              <InputLabel htmlFor="password-input">Password</InputLabel>
              <OutlinedInput
                sx={{ borderRadius: "15px" }}
                id="password-input"
                type={this.state.showPassword ? "text" : "password"}
                className={Styles.password_text_field}
                onChange={this.handleChange("password")}
                value={this.state.password}
                label="Password"
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="Toggle password visibility"
                      onClick={this.handleClickShowPassword}
                      onMouseDown={this.handleMouseDownPassword}>
                      {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                } />
            </FormControl>
            <Button
              className={Styles.login_button}
              onClick={this.onLogin}
              sx={{ width: "35%", height: 40, minWidth: "fit-content", borderRadius: "10px" }}
              theme={this.theme} variant="contained">Log in</Button>
          </div>
        </div>
      );
    }
  }

}