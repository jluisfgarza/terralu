import React, { Component, Fragment } from "react";
import axios from "axios";
import MaterialTable from "material-table";
import AlertDialog from "../../Store/components/Alert/Alert";
import Typography from "@material-ui/core/Typography";

const orders = [
  { title: "Order ID", field: "_id" },
  { title: "ClientID", field: "username", hidden: true },
  { title: "Client", field: "userEmail" },
  { title: "Address", field: "address" },
  // { title: "Products", field: "products", hidden: true },
  { title: "Total", field: "total" },
  { title: "PayPal ID", field: "paypalId" },
  { title: "Status", field: "Status", hidden: true },
  { title: "Date", field: "date" }
];

class OrderData extends Component {
  constructor() {
    super();
    this.state = {
      ordersData: [],
      openAlert: false,
      alertMessage: "",
      alertTitle: ""
    };
  }

  handleCloseAlert = () => {
    this.setState({ openAlert: false });
  };

  componentDidMount() {
    axios
      .get("/api/orders")
      .then(res => {
        const ordersData = res.data;
        // console.log(res.data);
        this.setState({ ordersData });
      })
      .catch(error => {
        this.setState({
          openAlert: true,
          alertMessage: "Error could not fetch Orders",
          alertTitle: "Error"
        });
      });
  }

  render() {
    return (
      <Fragment>
        <MaterialTable
          columns={orders}
          data={this.state.ordersData}
          title="Orders"
          detailPanel={[
            {
              tooltip: "Order Details",
              render: rowData => {
                return (
                  <div
                    style={{
                      fontSize: 16,
                      marginLeft: 20
                    }}
                  >
                    {rowData.products.map(element => (
                      <div key={element._id}>
                        <br />
                        <Typography color="textSecondary">
                          {"Product: " + element.title} <br />
                        </Typography>
                        <Typography color="textSecondary">
                          {"Quantity: " + element.quantity}
                        </Typography>
                        <hr />
                        <br />
                      </div>
                    ))}
                  </div>
                );
              }
            }
          ]}
          options={{
            actionsColumnIndex: -1,
            pageSize: 15,
            doubleHorizontalScroll: false,
            columnsButton: true,
            exportButton: true
          }}
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

export default OrderData;
