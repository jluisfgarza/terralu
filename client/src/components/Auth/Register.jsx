import React, { Component, Fragment } from "react";
// Router
import { Link, withRouter } from "react-router-dom";
// Material UI Components
import {
  Paper,
  Button,
  FormControl,
  MuiThemeProvider,
  createMuiTheme,
  CssBaseline,
  TextField
} from "@material-ui/core";
import ErrorDialog from "./ErrorDialog";
// Icons
import ArrowBack from "@material-ui/icons/ArrowBack";
//Style
import signinStyle from "./signinStyle";
import { withStyles } from "@material-ui/core/styles";
// Images
import Logo from "../../assets/logo.jpg";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";
import classnames from "classnames";
import compose from "recompose/compose";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#388e3c"
    }
  }
});

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      password2: "",
      errors: {},
      openDialog: false
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  dialogPromptOpen = message => {
    this.setState({
      openDialog: true,
      errors: message
    });
  };

  dialogClose = () => {
    this.setState({ openDialog: false });
  };

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };
    console.log(newUser);
    this.props.registerUser(newUser, this.props.history);
  };

  render() {
    const { classes } = this.props;
    const { errors } = this.state;

    return (
      <Fragment>
        <CssBaseline />
        <div className={classes.root}>
          <div className={classes.container}>
            <Paper className={classes.paper}>
              <Link to="/" className={classes.backBtn}>
                <ArrowBack />
              </Link>
              <img src={Logo} alt="Logo" className={classes.heroLogo} />
              <p>
                Already have an account?{" "}
                <Link to="/login" className={classes.green}>
                  Log in
                </Link>
              </p>
              <form noValidate onSubmit={this.onSubmit}>
                <MuiThemeProvider theme={theme}>
                  <FormControl margin="normal" required fullWidth>
                    <TextField
                      autoFocus
                      autoComplete="name"
                      name="name"
                      label="Name"
                      id="name"
                      type="text"
                      helperText={errors.name}
                      onChange={this.onChange}
                      value={this.state.name}
                      error={errors.name ? true : false}
                      className={classnames("", {
                        invalid: errors.name
                      })}
                    />
                  </FormControl>
                  <FormControl margin="normal" required fullWidth>
                    <TextField
                      autoFocus
                      autoComplete="email"
                      name="email"
                      label="Email"
                      id="email"
                      type="email"
                      helperText={errors.email}
                      onChange={this.onChange}
                      value={this.state.email}
                      error={errors.email ? true : false}
                      className={classnames("", {
                        invalid: errors.email
                      })}
                    />
                  </FormControl>
                  <FormControl margin="normal" required fullWidth>
                    <TextField
                      autoFocus
                      autoComplete="password"
                      name="password"
                      label="Password"
                      id="password"
                      type="password"
                      helperText={errors.password}
                      onChange={this.onChange}
                      value={this.state.password}
                      error={errors.password ? true : false}
                      className={classnames("", {
                        invalid: errors.password
                      })}
                    />
                  </FormControl>
                  <FormControl margin="normal" required fullWidth>
                    <TextField
                      autoFocus
                      autoComplete="password"
                      name="password2"
                      label="Confirm Password"
                      id="password2"
                      type="password"
                      helperText={errors.password2}
                      onChange={this.onChange}
                      value={this.state.password2}
                      error={errors.password2 ? true : false}
                      className={classnames("", {
                        invalid: errors.password2
                      })}
                    />
                  </FormControl>

                  <Button
                    fullWidth
                    className={classes.submit}
                    variant="contained"
                    type="submit"
                    color="primary"
                  >
                    Sign Up
                  </Button>
                </MuiThemeProvider>
              </form>
            </Paper>
            <ErrorDialog
              error={this.state.errors}
              openDialog={this.state.openDialog}
              dialogClose={this.dialogClose}
            />
          </div>
        </div>
      </Fragment>
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default withStyles(signinStyle)(
  connect(
    mapStateToProps,
    { registerUser }
  )(withRouter(Register))
);
