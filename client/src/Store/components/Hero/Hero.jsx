import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
// import Card from "@material-ui/core/Card";
// import CardContent from "@material-ui/core/CardContent";
// import CardMedia from "@material-ui/core/CardMedia";
// import Hidden from "@material-ui/core/Hidden";
// Styles
import styles from "../styles";
// Config
// import { featuredPosts } from "../config";
// Images
import Logo from "../../assets/logo.jpg";

class Hero extends Component {
  render() {
    const { classes } = this.props;

    return (
      <Paper className={classes.mainFeaturedPost}>
        <Grid container>
          <Grid item md={6}>
            <div className={classes.mainFeaturedPostContent}>
              <img src={Logo} alt="Logo" className={classes.heroLogo} />
              <Typography variant="h5" color="inherit" paragraph>
                Boutique de terrarios y suculentas. Producidas en casa y
                garantizadas.
              </Typography>
            </div>
          </Grid>
        </Grid>
      </Paper>
    );
  }
}

Hero.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Hero);
