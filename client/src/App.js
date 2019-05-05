import React, { Component } from "react";
// Components
import Login from "./Store/components/Auth/Login";
import Register from "./Store/components/Auth/Register";
import Content from "./Store/Content";
import PrivateRoute from "./Store/components/private-route/PrivateRoute";
import AdminPrivateRoute from "./Store/components/private-route/AdminPrivateRoute";
import Admin from "./Admin/Admin";
import {
  MuiThemeProvider,
  createMuiTheme,
} from "@material-ui/core";
// Router
import { Switch, Route } from "react-router-dom";
// Auth
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import { getAllProducts} from "./actions/cartActions";
// Router
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";

// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
  // Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Redirect to login
    window.location.href = "./login";
  }
}
store.dispatch(getAllProducts());

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#388e3c"
    }
  },
  typography: {
    useNextVariants: true
  }
});

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
      <Provider store={store}>
        <BrowserRouter>
          <Switch>
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/" component={Content} />
            <PrivateRoute exact path="/store" component={Content} />
            <PrivateRoute exact path="/profile" component={Content} />
            <PrivateRoute exact path="/cart" component={Content} />
            <AdminPrivateRoute exact path="/admin" component={() => <Admin url="Dashboard" />} />
            <AdminPrivateRoute exact path="/admin/dashboard" component={() => <Admin url="Dashboard" />} />
            <AdminPrivateRoute exact path="/admin/products" component={() => <Admin url="Products" />} />
            <AdminPrivateRoute exact path="/admin/orders" component={() => <Admin url="Orders" />} />
            <AdminPrivateRoute exact path="/admin/users" component={() => <Admin url="Users" />} />
          </Switch>
        </BrowserRouter>
      </Provider>
      </MuiThemeProvider>
    );
  }
}

export default App;
