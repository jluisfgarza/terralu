import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
// Icons
import Icon, { Stack } from "@mdi/react";
import { mdiFacebookBox, mdiInstagram } from "@mdi/js";
// Styles
import styles from "../styles";
// Config
import { sections } from "../config";
// Router
import { Link } from "react-router-dom";

class Hero extends Component {
  render() {
    const { classes } = this.props;
    return (
      <Fragment>
        <Toolbar className={classes.toolbarMain}>
          <IconButton aria-label="Facebook" className={classes.margin}>
            <Stack color="#444">
              <Icon path={mdiFacebookBox} color="red" />
            </Stack>
          </IconButton>
          <IconButton aria-label="Instagramm" className={classes.margin}>
            <Stack color="#444">
              <Icon path={mdiInstagram} color="red" />
            </Stack>
          </IconButton>
          <Typography
            component="h2"
            variant="h5"
            color="inherit"
            align="center"
            noWrap
            className={classes.toolbarTitle}
          >
            Terralú
          </Typography>
          <IconButton>
            <SearchIcon />
          </IconButton>
          <Link to="/login">
            <Button variant="outlined" size="small">
              Log in
            </Button>
          </Link>
        </Toolbar>
        <Toolbar variant="dense" className={classes.toolbarSecondary}>
          {sections.map(section => (
            <Typography color="inherit" noWrap key={section}>
              {section}
            </Typography>
          ))}
        </Toolbar>
      </Fragment>
    );
  }
}
Hero.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Hero);
