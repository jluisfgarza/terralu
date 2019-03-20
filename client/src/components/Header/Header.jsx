import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
// Imgs
import Logo from "../../assets/logo2.jpg";
// Icons
import MoreIcon from "@material-ui/icons/MoreVert";
import Icon from "@mdi/react";
import { mdiFacebookBox, mdiInstagram } from "@mdi/js";
// Styles
import styles from "../styles";
// Router
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";

class Header extends Component {
  state = {
    anchorEl: null
  };

  handleMenuOpen = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleMenuClose = () => {
    this.setState({ anchorEl: null });
  };

  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  render() {
    const { anchorEl } = this.state;
    const { classes } = this.props;
    const isMenuOpen = Boolean(anchorEl);
    const adminMenu =
      this.props.auth.user.type === "admin" ? (
        <MenuItem>
          <Link to="/admin" style={{ textDecoration: "none" }}>
            Admin Panel
          </Link>
        </MenuItem>
      ) : (
        <Fragment />
      );

    const renderMenu = (
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        open={isMenuOpen}
        onClose={this.handleMenuClose}
      >
        <MenuItem onClick={this.handleMenuClose}>
          <Link to="/profile" style={{ textDecoration: "none" }}>
            Profile
          </Link>
        </MenuItem>
        {adminMenu}
        <MenuItem onClick={this.onLogoutClick}>Log Out</MenuItem>
      </Menu>
    );

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
          {this.props.auth.isAuthenticated ? (
            <Fragment>
              <h5>{"Hola! " + this.props.auth.user.name}</h5>
              <IconButton
                aria-owns={isMenuOpen ? "material-appbar" : undefined}
                aria-haspopup="true"
                onClick={this.handleMenuOpen}
                color="inherit"
              >
                <MoreIcon />
              </IconButton>
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
        {renderMenu}
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
