import React, { Fragment } from "react";
import axios from "axios";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import Slide from "@material-ui/core/Slide";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class DeleteProductDialog extends React.Component {
  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    const product = {
      _id: this.props.product["_id"]
    };
    axios
      .delete(
        `http://localhost:5000/api/products/${this.props.product["_id"]}`,
        { data: product }
      )
      .then(res => {
        // console.log(res);
        // console.log(res.data);
      });
    this.props.handleReload();
    this.props.handleCloseDelete();
  };

  render() {
    return (
      <Fragment>
        <Dialog
          open={this.props.openDelete}
          TransitionComponent={Transition}
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
            <Button onClick={this.handleSubmit} color="primary">
              Confirmar
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    );
  }
}

export default DeleteProductDialog;
