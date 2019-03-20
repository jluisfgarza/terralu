import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: "center",
    color: theme.palette.text.secondary
  }
});

class Profile extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Grid container spacing={24}>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              {"Nombre: " + this.props.user.name}
            </Paper>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Paper className={classes.paper}>
              {"Email: " + this.props.user.email} <br />
              {"Telephone: " + this.props.user.telephone}
            </Paper>
          </Grid>
          <Grid item xs={12} sm={9}>
            <Paper className={classes.paper}>
              Orders: <br />
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  }
}

Profile.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Profile);
