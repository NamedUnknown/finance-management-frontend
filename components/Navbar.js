import React from "react";
import Styles from "../styles/Navbar.module.css"
import Button from '@mui/material/Button';
import { Link } from "@mui/material";

import { useSelector, useDispatch } from "react-redux"
import { logOutUser } from "../store/authSlice";

export default function Navbar() {

  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);

  function handleLogOut() { dispatch(logOutUser()) };


  function authUserOperation() {
    if (isAuthenticated) {
      return (
        <div className={Styles.authenticated_container}>
          <div className={Styles.auth_message}>
            Hallo {user.name == null ? "user" : user.name}!
          </div>
          <Button variant="outlined" onClick={() => handleLogOut()} className={Styles.logout_button}>Log Out</Button>
        </div>
      );
    } else {
      return (
        <div className={Styles.auth_buttons_container}>
          <Link href="/login" style={{ textDecoration: "none" }}>
            <div className={Styles.login_button}>
              Log in
            </div>
          </Link>
          <Link href="/register" style={{ textDecoration: "none" }}>
            <div className={Styles.register_button}>
              Register
            </div>
          </Link>
        </div>
      );
    }
  }

  return (
    <div className={Styles.navbar_container}>
      <div className={Styles.options_container}>
        {isAuthenticated ? <div></div> : <div></div>}
      </div>
      <div className={Styles.mid_container}>
        {isAuthenticated ? <div></div> : <div></div>}
      </div>
      <div className={Styles.auth_container}>
        {authUserOperation()}
      </div>
    </div>);
}