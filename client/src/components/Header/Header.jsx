import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
// Imgs
import Logo from "../../assets/logo2.jpg";
// Icons
import Icon from "@mdi/react";
import { mdiFacebookBox, mdiInstagram } from "@mdi/js";
// Styles
import styles from "../styles";
// Router
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";

class Header extends Component {
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  render() {
    const { classes } = this.props;

    return (
      <Fragment>
        <Toolbar className={classes.toolbarMain}>
          <a href="https://www.facebook.com/terralumx/" target="blank">
            <Icon
              className={classes.socialIcons}
              path={mdiFacebookBox}
              size={1.3}
              color="grey"
            />
          </a>
          <a href="https://www.instagram.com/terralumx/" target="blank">
            <Icon
              className={classes.socialIcons}
              path={mdiInstagram}
              size={1.3}
              color="grey"
            />
          </a>
          <div className={classes.grow} />
          <Avatar alt="Logo" src={Logo} className={classes.toolbarTitle} />
          <div className={classes.grow} />
          {this.props.auth.isAuthenticated &&
          this.props.auth.user.type === "admin" ? (
            <Fragment>
              <h5>{"Benvnid@: " + this.props.auth.user.name}</h5>
              <Link to="/admin">
                <Button
                  className={classes.button}
                  key="admin"
                  variant="outlined"
                  size="small"
                >
                  Admin Panel
                </Button>
              </Link>
            </Fragment>
          ) : (
            <Fragment />
          )}
          {this.props.auth.isAuthenticated ? (
            <Fragment>
              <Link to="/login">
                <Button
                  className={classes.button}
                  key="logout"
                  onClick={this.onLogoutClick}
                  variant="outlined"
                  size="small"
                >
                  Log Out
                </Button>
              </Link>
            </Fragment>
          ) : (
            <Link to="/login">
              <Button key="login" variant="outlined" size="small">
                Log In / Register
              </Button>
            </Link>
          )}
        </Toolbar>
        <br />
      </Fragment>
    );
  }
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default withRouter(
  connect(
    mapStateToProps,
    { logoutUser }
  )(withStyles(styles)(Header))
);
