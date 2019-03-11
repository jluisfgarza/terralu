import React, { Component, Fragment } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from "@material-ui/core";

class ErrorDialog extends Component {
  render() {
    return (
      <Fragment>
        <Dialog
          open={this.props.openDialog}
          onClose={this.props.dialogClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Erorr!"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {this.props.error}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.props.dialogClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.props.dialogClose} color="primary" autoFocus>
              OK
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    );
  }
}

export default ErrorDialog;
