import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import Avatar from "@material-ui/core/Avatar";
import { withStyles } from "@material-ui/core/styles";
// Imgs
import Logo from "../../assets/logo2.jpg";
// Styles
import styles from "../styles";

class Footer extends Component {
  render() {
    const { classes } = this.props;
    return (
      <Fragment>
        <footer className={classes.footer}>
          <center>
            <Avatar alt="Logo" src={Logo} className={classes.toolbarTitle} />
          </center>
        </footer>
      </Fragment>
    );
  }
}
Footer.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Footer);
