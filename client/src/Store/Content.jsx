import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
// Router
import { Switch, Route } from "react-router-dom";
// Components
import { withStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Header from "./components/Header/Header";
import Hero from "./components/Hero/Hero";
import Footer from "./components/Footer/Footer";
import Catalog from "./components/Catalog/Catalog";
import Profile from "./components/Profile/Profile";
import { connect } from "react-redux";
import Cart from "./components/Cart/Cart";

const styles = theme => ({
  layout: {
    width: "auto",
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
      width: 1100,
      marginLeft: "auto",
      marginRight: "auto"
    }
  }
});

class Content extends Component {
  componentDidMount = () => {
    /* If logged in and user navigates to Login page,
      should redirect them to store
    */
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/store");
      // console.log(this.props.auth);
    }
  };

  render() {
    const { classes } = this.props;
    return (
      <Fragment>
        <CssBaseline />
        <Header />
        <div className={classes.layout}>
          <Hero />
          <Switch>
            <Route
              path="/"
              exact
              component={() => <Catalog user={this.props.auth} />}
            />
            <Route
              path="/store"
              exact
              component={() => <Catalog user={this.props.auth} />}
            />
            <Route
              path="/cart"
              exact
              component={() => <Cart user={this.props.auth.user} />}
            />
            <Route
              path="/profile"
              exact
              component={() => <Profile user={this.props.auth.user} />}
            />
          </Switch>
        </div>
        <Footer />
      </Fragment>
    );
  }
}

Content.propTypes = {
  auth: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(withStyles(styles)(Content));
