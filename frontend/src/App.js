import React, { Component, Fragment } from "react";
import "./App.css";
// Components
import SignIn from "./components/Auth/SignIn";
import Content from "./Content";
// Router
import { Switch, Route, Redirect, withRouter } from "react-router-dom";


class App extends Component {
  state = {
    authUser: false
  };

  login = event => {
    const { history } = this.props;
    event.preventDefault();
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
          <Route path="/login" exact render={() => <SignIn login={this.login} />} />
          <Redirect from="/" to="/login" />
          <Redirect from="/store" to="/login" />
        </Switch>
      </Fragment>
    );
    return (
      <Fragment>
        {renderPlatform}
      </Fragment>
    );
  }
}

export default withRouter(App);
