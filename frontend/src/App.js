import React, { Component, Fragment } from "react";
import "./App.css";
// Components
import SignIn from "./components/Auth/SignIn";
import Content from "./Content";
// Router
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
// Context API
import { WithAppContext } from "./appContext";

class App extends Component {
  state = {
    isUserSignedIn: this.props.context.isUserSignedIn
  };

  login = event => {
    const { history } = this.props;
    event.preventDefault();
    this.props.context.logIn();
    history.push("/store");
  };

    logout = event => {
    const { history } = this.props;
    event.preventDefault();
    this.props.context.logOut();
    history.push("/store");
  };

  render() {
    const renderPlatform = this.props.context.state.isUserSignedIn ? (
      <Fragment>
        <Switch>
          <Redirect from="/" to="/store"/>
          <Redirect from="/login" to="/store" />
        </Switch>
        <Content
          isUserSignedIn={this.state.isUserSignedIn}/>
      </Fragment>
    ) : (
      <Fragment>
        <Switch>
          {/* <Route path="/" exact component={Content} /> */}
          <Route path="/login" exact render={() => <SignIn />} />
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

export default WithAppContext(withRouter(App));
