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
  constructor(props) {
    super(props);
    this.state = {
      // authUser: null,
    };
  }

  render() {
    const { classes } = this.props;

    return (
      <Fragment>
        <CssBaseline />
        <Header />
        <div className={classes.layout}>
          <Hero />
          <Switch>
            <Route path="/" exact component={Catalog} />
            <Route path="/store" exact component={Catalog} />
            <Route path="/cart" exact render={() => <h1>cart</h1>} />
            <Route path="/payment" exact render={() => <h1>payment</h1>} />
          </Switch>
          <Footer />
        </div>
      </Fragment>
    );
  }
}

Content.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Content);
