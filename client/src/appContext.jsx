import React, { Component } from "react";
import PropTypes from "prop-types";

export const AppContext = React.createContext("fire");
export const WithAppContext = Component => {
  return props => (
    <AppContext.Consumer>
      {state => <Component {...props} context={state} />}
    </AppContext.Consumer>
  );
};

export default class AppProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <AppContext.Provider
        value={{
          state: this.state
          // logIn: () => {
          //   this.setState({ isUserSignedIn: true });
          // },
          // logOut: () => {
          //   this.setState({ isUserSignedIn: false });
          // }
        }}
      >
        {this.props.children}
      </AppContext.Provider>
    );
  }
}

AppProvider.propTypes = {
  children: PropTypes.node.isRequired
};
