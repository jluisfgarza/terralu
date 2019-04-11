import React, { Component, Fragment } from "react";
import axios from "axios";
import MaterialTable from "material-table";
import EditProductDialog from "../EditProductDialog";
import DeleteProductDialog from "../DeleteProductDialog";

const products = [
  {
    title: "Image",
    field: "image",
    render: rowData => (
      <img
        style={{ height: 36, borderRadius: "50%" }}
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
    open: false,
    openDelete: false
  };

  editDialog = product => {
    this.setState({
      open: true,
      product: product
    });
    console.log(product);
  };

  deleteDialog = product => {
    this.setState({
      openDelete: true,
      product: product
    });
    console.log(product);
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClickOpenDelete = () => {
    this.setState({ openDelete: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleCloseDelete = () => {
    this.setState({ openDelete: false });
  };

  componentDidMount() {
    axios
      .get("/api/products")
      .then(res => {
        const productsData = res.data;
        this.setState({ productsData });
        // console.log(res.data);
      })
      .catch(error => {
        alert("Error could not fetch Products");
      });
  }

  render() {
    const { sizeNum } = this.props;

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
                    {rowData.image} Galería
                  </div>
                );
              }
            }
          ]}
          options={{
            actionsColumnIndex: -1,
            pageSize: sizeNum,
            doubleHorizontalScroll: false
          }}
        />
        <EditProductDialog
          open={this.state.open}
          product={this.state.product}
          handleClickOpen={this.handleClickOpen}
          handleClose={this.handleClose}
        />
        <DeleteProductDialog
          openDelete={this.state.openDelete}
          product={this.state.product}
          handleClickOpenDelete={this.handleClickOpenDelete}
          handleCloseDelete={this.handleCloseDelete}
        />
      </Fragment>
    );
  }
}
export default ProductData;
