import React, { Component, Fragment } from "react";
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

  render() {
    const renderPlatform = this.props.context.state.isUserSignedIn ? (
      <Fragment>
        <Switch>
          {/* <Redirect from="/" to="/store"/> */}
          <Redirect from="/login" to="/store" />
        </Switch>
        <Content
          isUserSignedIn={this.state.isUserSignedIn}/>
      </Fragment>
    ) : (
      <Fragment>
        <Switch>
          <Route path="/" exact component={Content} />
          <Route path="/login" exact render={() => <SignIn />} />
          {/* <Redirect from="/" to="/login" /> */}
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
