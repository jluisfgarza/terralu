import React, { Component } from "react";
import axios from "axios";
import MaterialTable from "material-table";

const orders = [
  { title: "PaymentID", field: "PaymentID" },
  { title: "UserName", field: "UserName" },
  { title: "Address", field: "Address" },
  { title: "Products", field: "Product" },
  { title: "Total", field: "price" },
  { title: "PayPal ID", field: "PaymentID" },
  { title: "Status", field: "Status" },
  { title: "Date", field: "date" }
];

class OrderData extends Component {
  constructor() {
    super();
    this.state = { ordersData: [] };
  }
  componentDidMount() {
    axios
      .get("/api/orders")
      .then(res => {
        const ordersData = res.data;
        this.setState({ ordersData });
      })
      .catch(error => {
        alert("Error could not fetch Orders");
      });
  }
  render() {
    return (
      <MaterialTable
        columns={orders}
        data={this.state.ordersData}
        title="Orders"
        detailPanel={[
          {
            tooltip: "Image",
            render: rowData => {
              return (
                <div
                  style={{
                    fontSize: 16,
                    marginLeft: 20
                  }}
                >
                  Lista de productos:
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
        // editable={{
        //   onRowUpdate: (newData, oldData) =>
        //     new Promise((resolve, reject) => {
        //       setTimeout(() => {
        //         {
        //           /* const data = this.state.data;
        //   const index = data.indexOf(oldData);
        //   data[index] = newData;
        //   this.setState({ data }, () => resolve()); */
        //         }
        //         resolve();
        //       }, 1000);
        //     })
        // }}
      />
    );
  }
}

export default OrderData;
