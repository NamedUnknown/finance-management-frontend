import React from "react";
import Styles from "../styles/Home.module.css"

export default class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (false) {
      return (
        <div className={Styles.home_container}>
          <div className={Styles.profile_container}></div>
        </div>
      );
    } else {
      return (
        <div>
          No Auth
        </div>
      );
    }
  }
}