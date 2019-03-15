import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
// Icons
import Icon from "@mdi/react";
import { mdiFacebookBox, mdiInstagram } from "@mdi/js";
// Styles
import styles from "../styles";

class Footer extends Component {
  render() {
    const { classes } = this.props;
    return (
      <Fragment>
        <footer className={classes.footer}>
          <center>
            <Typography variant="h6" gutterBottom>
              TerralúMX
            </Typography>
            <a href="https://www.facebook.com/terralumx/" target="blank">
              <Icon
                className={classes.socialIcons}
                path={mdiFacebookBox}
                size={1.3}
                color="grey"
              />
            </a>
            <a href="https://www.instagram.com/terralumx/" target="blank">
              <Icon
                className={classes.socialIcons}
                path={mdiInstagram}
                size={1.3}
                color="grey"
              />
            </a>
          </center>
        </footer>
      </Fragment>
    );
  }
}
Footer.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Footer);
