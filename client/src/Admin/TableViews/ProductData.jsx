import React, { Component, Fragment } from "react";
import axios from "axios";
import MaterialTable from "material-table";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import AddProductDialog from "../Dialogs/AddProductDialog";
import EditProductDialog from "../Dialogs/EditProductDialog";
import DeleteProductDialog from "../Dialogs/DeleteProductDialog";
import AlertDialog from "../../Store/components/Alert/Alert";

const styles = theme => ({
  button: {
    margin: 10
  }
});

const products = [
  { title: "ID", field: "_id", hidden: true },
  {
    title: "Image",
    field: "image",
    render: rowData => (
      <img
        style={{ height: 45, width: 45, borderRadius: "50%" }}
        src={rowData.image}
        alt="Imagen Principal"
      />
    )
  },
  { title: "Title", field: "title" },
  { title: "Description", field: "description" },
  { title: "Price", field: "price", type: "numeric" },
  { title: "Stock", field: "inStock", type: "numeric" },
  { title: "Bought", field: "numBought", type: "numeric" },
  {
    title: "Photos",
    field: "photos",
    hidden: true
    // render: rowData =>
    //   rowData.image.map(img => (
    //     <img
    //       key={img.id}
    //       style={{ height: 36, borderRadius: "50%" }}
    //       src={img}
    //       alt={"Imagen Principal " + img.id}
    //     />
    //   ))
  }
];

class ProductData extends Component {
  state = {
    product: null,
    openEdit: false,
    openDelete: false,
    openAdd: false,
    openAlert: false,
    alertMessage: "",
    alertTitle: ""
  };

  editDialog = product => {
    this.setState({
      openEdit: true,
      product: product
    });
    // console.log(product);
  };

  deleteDialog = product => {
    this.setState({
      openDelete: true,
      product: product
    });
    // console.log(product);
  };

  handleClickOpenAdd = () => {
    this.setState({ openAdd: true });
  };

  handleCloseAdd = () => {
    this.setState({ openAdd: false });
  };

  handleClickOpenEdit = () => {
    this.setState({ openEdit: true });
  };

  handleCloseEdit = () => {
    this.setState({ openEdit: false });
  };

  handleClickOpenDelete = () => {
    this.setState({ openDelete: true });
  };

  handleCloseDelete = () => {
    this.setState({ openDelete: false });
  };

  handleReload = () => {
    axios
      .get("/api/products")
      .then(res => {
        const productsData = res.data;
        this.setState({ productsData });
        // console.log(res.data);
      })
      .catch(error => {
        this.setState({
          openAlert: true,
          alertMessage: "Error could not fetch Products",
          alertTitle: "Error"
        });
      });
  };

  handleCloseAlert = () => {
    this.setState({ openAlert: false });
  };

  componentDidMount() {
    this.handleReload();
  }

  render() {
    const { sizeNum, classes } = this.props;

    var actionsConfig = [
      {
        icon: "edit",
        tooltip: "Edit Product Info",
        onClick: (event, rowData) => {
          this.editDialog(rowData);
        },
        iconProps: {
          style: {
            fontSize: 30,
            color: "grey"
          }
        }
      },
      {
        icon: "delete",
        tooltip: "Delete product",
        onClick: (event, rowData) => {
          this.deleteDialog(rowData);
        },
        iconProps: {
          style: {
            fontSize: 30,
            color: "red"
          }
        }
      }
    ];

    return (
      <Fragment>
        {!this.props.hideAdd ? (
          <Button
            variant="outlined"
            color="primary"
            onClick={this.handleClickOpenAdd}
            className={classes.button}
          >
            Agregar Producto
          </Button>
        ) : (
          <Fragment />
        )}
        <Button
          variant="outlined"
          color="primary"
          onClick={this.handleReload}
          className={classes.button}
        >
          Refresh
        </Button>
        <MaterialTable
          columns={products}
          data={this.state.productsData}
          title="Products"
          actions={this.props.actions ? actionsConfig : null}
          detailPanel={[
            {
              tooltip: "Image",
              render: rowData => {
                return (
                  <div
                    style={{
                      fontSize: 100,
                      textAlign: "center",
                      color: "white",
                      backgroundColor: "#43A047"
                    }}
                  >
                    <img
                      style={{ height: 200, width: "auto" }}
                      src={rowData.image}
                      alt="Imagen Principal"
                    />
                  </div>
                );
              }
            }
          ]}
          options={{
            actionsColumnIndex: -1,
            pageSize: sizeNum,
            doubleHorizontalScroll: false,
            columnsButton: true,
            exportButton: true
          }}
        />
        <AddProductDialog
          openAdd={this.state.openAdd}
          handleClickOpenAdd={this.handleClickOpenAdd}
          handleCloseAdd={this.handleCloseAdd}
          handleReload={this.handleReload}
        />
        <EditProductDialog
          openEdit={this.state.openEdit}
          product={this.state.product}
          handleClickOpenEdit={this.handleClickOpenEdit}
          handleCloseEdit={this.handleCloseEdit}
          handleReload={this.handleReload}
        />
        <DeleteProductDialog
          openDelete={this.state.openDelete}
          product={this.state.product}
          handleClickOpenDelete={this.handleClickOpenDelete}
          handleCloseDelete={this.handleCloseDelete}
          handleReload={this.handleReload}
        />
        <AlertDialog
          openAlert={this.state.openAlert}
          alertMessage={this.state.alertMessage}
          alertTitle={this.state.alertTitle}
          handleCloseAlert={this.handleCloseAlert}
        />
      </Fragment>
    );
  }
}
export default withStyles(styles)(ProductData);
