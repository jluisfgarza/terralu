import React, { Component } from "react";
// Components
import Typography from "@material-ui/core/Typography";
// Styles
import { withStyles } from "@material-ui/core/styles";
import style from "./adminStyle";

class AdminContent extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Typography variant="h4" gutterBottom>
            {this.props.url}
          </Typography>
        </main>
      </div>
    );
  }
}

export default withStyles(style, { withTheme: true })(AdminContent);
