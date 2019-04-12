import React, { Fragment } from "react";
import axios from "axios";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
// Import React FilePond
import { FilePond, registerPlugin } from "react-filepond";
// Import FilePond styles
import "filepond/dist/filepond.min.css";
// Import the Image EXIF Orientation and Image Preview plugins
// Note: These need to be installed separately
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  },
  dense: {
    marginTop: 16
  },
  menu: {
    width: 200
  }
});

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class EditProductDialog extends React.Component {
  state = {
    _id: "",
    title: "",
    description: "",
    price: 0,
    inStock: 0,
    numBought: 0,
    image: null,
    photos: []
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.product !== this.props.product) {
      this.setState({
        _id: this.props.product._id,
        title: this.props.product.title,
        description: this.props.product.description,
        price: this.props.product.price,
        inStock: this.props.product.inStock,
        numBought: this.props.product.numBought,
        image: this.props.product.image,
        photos: this.props.product.photos
      });
    }
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    axios
      .put(`/api/products/${this.props.product["_id"]}`, this.state)
      .then(res => {
        // console.log(res);
      });
    this.props.handleReload();
    this.props.handleCloseEdit();
  };

  render() {
    const { classes } = this.props;
    return (
      <Fragment>
        <Dialog
          open={this.props.openEdit}
          TransitionComponent={Transition}
          onClose={this.handleCloseEdit}
          aria-labelledby="EditProductDialog"
        >
          <DialogTitle id="EditProductDialog">Editar producto</DialogTitle>
          <DialogContent>
            <form className={classes.container} noValidate autoComplete="off">
              <TextField
                id="ptitle"
                label="Product Name"
                className={classes.textField}
                value={this.state.title}
                onChange={this.handleChange("title")}
                margin="normal"
                variant="outlined"
                required
              />

              <TextField
                id="pprice"
                label="Price"
                value={this.state.price}
                onChange={this.handleChange("price")}
                type="number"
                className={classes.textField}
                InputLabelProps={{
                  shrink: true
                }}
                margin="normal"
                variant="outlined"
                required
              />

              <TextField
                id="pinStock"
                label="In Stock"
                value={this.state.inStock}
                onChange={this.handleChange("inStock")}
                type="number"
                className={classes.textField}
                InputLabelProps={{
                  shrink: true
                }}
                margin="normal"
                variant="outlined"
                required
              />

              <TextField
                id="pdescription"
                label="Description"
                fullWidth
                multiline
                rowsMax="4"
                rows="4"
                value={this.state.description}
                onChange={this.handleChange("description")}
                className={classes.textField}
                margin="normal"
                variant="outlined"
                required
              />
            </form>
            <Grid
              container
              direction="row"
              justify="center"
              alignItems="center"
              spacing={24}
            >
              <Grid item xs={12} sm={6}>
                <Typography variant="h6" gutterBottom>
                  Imagen Principal
                </Typography>
                <FilePond
                  ref={ref => (this.pond = ref)}
                  files={this.state.image}
                  allowMultiple={true}
                  maxFiles={1}
                  onupdatefiles={fileItems => {
                    this.setState({
                      image: fileItems.map(fileItem => fileItem.file)
                    });
                  }}
                  labelIdle='Drag & Drop your file or <span class="filepond--label-action">Browse</span>'
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="h6" gutterBottom>
                  Photos
                </Typography>
                <FilePond
                  ref={ref => (this.pond = ref)}
                  files={this.state.photos}
                  allowMultiple={true}
                  maxFiles={3}
                  onupdatefiles={fileItems => {
                    this.setState({
                      photos: fileItems.map(fileItem => fileItem.file)
                    });
                  }}
                  labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.props.handleCloseEdit} color="primary">
              Cancelar
            </Button>
            <Button onClick={this.handleSubmit} color="primary">
              Actualizar
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    );
  }
}

EditProductDialog.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(EditProductDialog);
