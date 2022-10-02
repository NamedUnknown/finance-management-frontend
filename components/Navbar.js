import React from "react";
import Styles from "../styles/Navbar.module.css"
import Button from '@mui/material/Button';
import { Link } from "@mui/material";

export default class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: props.user,
      isAuthenticated: props.isAuthenticated,
      theme: props.theme,
    };
  }

  handleLogOut = () => {
    this.setState({
      ...this.state,
      user: {},
      isAuthenticated: false,
    });
  }

  authUserOperation() {
    if (this.state?.isAuthenticated) {
      return (
        <div className={Styles.authenticated_container}>
          <div className={Styles.auth_message}>
            Hallo {this.state?.user?.name == null ? "user" : this.state?.user.name}!
          </div>
          <Button variant="outlined" onClick={this.handleLogOut}>Log Out</Button>
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

  render() {
    return (
      <div className={Styles.navbar_container}>
        <div className={Styles.options_container}>
          {this.state?.isAuthenticated ? <div></div> : <div></div>}
        </div>
        <div className={Styles.mid_container}>
          {this.state?.isAuthenticated ? <div></div> : <div></div>}
        </div>
        <div className={Styles.auth_container}>
          {this.authUserOperation()}
        </div>
      </div>)
      ;
  }
}