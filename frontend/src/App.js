import React, { Component, Fragment } from "react";
import "./App.css";
// Components
import PropTypes from "prop-types";
import SignIn from "./components/Auth/SignIn";
import Content from "./Content";
// Router
import { Switch, BrowserRouter, Route, Redirect } from "react-router-dom";


class App extends Component {
  state = {
    authUser: false
  };

  login() {
    // const { email, password } = this.state;
    const { history } = this.props;

    // if (this.state.email && this.state.password) {
    //   history.push("/store");
    // }
    // event.preventDefault();
    this.setState({
      authUser: true
    })
    history.push("/store");
  };

  componentDidMount() {
    // check if auth
  }
  render() {
    const renderPlatform = this.state.authUser ? (
      <Fragment>
        <Switch>
          <Redirect from="/" to="/store"/>
          <Redirect from="/login" to="/store" />
        </Switch>
        <Content />
      </Fragment>
    ) : (
      <Fragment>
        <Switch>
          {/* <Route path="/" exact component={Content} /> */}
          <Route path="/login" exact render={<SignIn login={this.login} />} />
          <Redirect from="/" to="/login" />
          <Redirect from="/store" to="/login" />
        </Switch>
      </Fragment>
    );
    return (
      <Fragment>
        <BrowserRouter>
          {renderPlatform}
        </BrowserRouter>
      </Fragment>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired
};

export default App;
