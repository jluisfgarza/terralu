import React, { Component, Fragment } from "react";
import { withStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
// Imgs
import Logo from "../../assets/logo2.jpg";
// Icons
import MoreIcon from "@material-ui/icons/MoreVert";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import Icon from "@mdi/react";
import { mdiFacebookBox, mdiInstagram } from "@mdi/js";
// Styles
import styles from "../styles";
// Router
import { Link, withRouter } from "react-router-dom";
import { logoutUser } from "../../../actions/authActions";
import { Divider } from "@material-ui/core";
// Redux
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCartProducts } from "../../../reducers";

class Header extends Component {
  state = {
    anchorEl: null
  };

  itemsInCar = products => {
    var total = 0;
    for (var i = 0; i < products.length; i++) {
      total += products[i].quantity;
    }
    return total;
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
        <Link to="/admin" style={{ textDecoration: "none" }}>
          <MenuItem>Admin Panel</MenuItem>
        </Link>
      ) : null;

    const renderMenu = (
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        open={isMenuOpen}
        onClose={this.handleMenuClose}
      >
        <MenuItem>
          <h5>{this.props.auth.user.name + " "}</h5>
        </MenuItem>
        <Divider />
        <Link to="/profile" style={{ textDecoration: "none" }}>
          <MenuItem onClick={this.handleMenuClose}>Perfil</MenuItem>
        </Link>
        {adminMenu}
        <MenuItem onClick={this.onLogoutClick}>Log Out</MenuItem>
      </Menu>
    );

    const cartIcon = (
      <Fragment>
        <Badge
          badgeContent={
            this.props.products.length > 0
              ? this.props.products.reduce(function(tot, record) {
                  return tot + record.quantity;
                }, 0)
              : 0
          }
          color="primary"
          classes={{ badge: this.props.classes.badge }}
        >
          <ShoppingCartIcon />
        </Badge>
      </Fragment>
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
          <Link to="/" style={{ textDecoration: "none" }}>
            <Avatar alt="Logo" src={Logo} className={classes.toolbarTitle} />
          </Link>
          <div className={classes.grow} />
          {this.props.auth.isAuthenticated ? (
            <Fragment>
              <Link to="/cart" style={{ textDecoration: "none" }}>
                <IconButton aria-label="Cart">{cartIcon}</IconButton>
              </Link>
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
  auth: PropTypes.object.isRequired,
  products: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      quantity: PropTypes.number.isRequired
    })
  ).isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  products: getCartProducts(state)
});

export default withRouter(
  connect(
    mapStateToProps,
    { logoutUser }
  )(withStyles(styles)(Header))
);
