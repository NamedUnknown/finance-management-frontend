import { useState } from "react";
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
import { useRouter } from "next/router"

import { useSelector, useDispatch } from "react-redux"
import { updateUserData } from "../store/authSlice";


export default function Login() {
  const router = useRouter()

  const dispatch = useDispatch()
  const user = useSelector((state) => state.auth.user);

  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);


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

  function handleChange(prop, event) {
    setLoginForm({ ...loginForm, [prop]: event.target.value });
  };

  function handleClickShowPassword() {
    setShowPassword(!showPassword);
  };

  async function onLogin() {
    try {
      setLoading(true);
      const response = await fetch(process.env.springboot + "/login", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "login-form": JSON.stringify({
            email: loginForm.email,
            password: loginForm.password
          })
        },
      });
      const body = await response.json();
      dispatch(updateUserData(body));
      router.push("/")
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };


  if (loading) {
    return <Loading theme={theme} />;
  } else {
    return (
      <div className={Styles.login_container}>
        <div className={Styles.login_form}>
          <FormControl variant="outlined" sx={{ width: "100%" }} theme={theme}>
            <InputLabel htmlFor="email-input">Email address</InputLabel>
            <OutlinedInput
              sx={{ borderRadius: "15px" }}
              id="email-input"
              type="text"
              className={Styles.email_text_field}
              value={loginForm.email}
              label="Email address"
              onChange={(e) => handleChange("email", e)} />
          </FormControl>
          <FormControl variant="outlined" sx={{ width: "100%" }} theme={theme}>
            <InputLabel htmlFor="password-input">Password</InputLabel>
            <OutlinedInput
              sx={{ borderRadius: "15px" }}
              id="password-input"
              type={showPassword ? "text" : "password"}
              className={Styles.password_text_field}
              onChange={(e) => handleChange("password", e)}
              value={loginForm.password}
              label="Password"
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="Toggle password visibility"
                    onClick={() => handleClickShowPassword()}>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              } />
          </FormControl>
          <Button
            className={Styles.login_button}
            onClick={() => onLogin()}
            sx={{ width: "35%", height: 40, minWidth: "fit-content", borderRadius: "10px" }}
            theme={theme} variant="contained">Log in</Button>
        </div>
      </div>
    );
  }
}