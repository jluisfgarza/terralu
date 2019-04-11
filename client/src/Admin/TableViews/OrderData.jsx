import React, { Component } from "react";
import axios from "axios";
import MaterialTable from "material-table";

const orders = [
  { title: "Price", field: "price", type: "numeric" },
  { title: "Date", field: "date", type: "date" }
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
