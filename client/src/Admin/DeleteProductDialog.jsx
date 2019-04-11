import React, { Fragment } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

class DeleteProductDialog extends React.Component {
  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  handleInit() {
    console.log("FilePond instance has initialised", this.pond);
  }

  render() {
    return (
      <Fragment>
        <Dialog
          open={this.props.openDelete}
          onClose={this.props.handleCloseDelete}
          aria-labelledby="DeleteProductDialog"
        >
          <DialogTitle id="DeleteProductDialog">Borrar Producto</DialogTitle>
          <DialogContent>
            {this.props.product ? (
              <Fragment>
                {"Borrar Producto: " + this.props.product["title"]}
                <br />
                {"ID: " + this.props.product["_id"]}
              </Fragment>
            ) : (
              "Delete"
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={this.props.handleCloseDelete} color="primary">
              Cancelar
            </Button>
            <Button onClick={this.props.handleCloseDelete} color="primary">
              Confirmar
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    );
  }
}

export default DeleteProductDialog;
