import React, { Component, Fragment } from "react";
import MaterialTable from "material-table";
import ProductDialog from "./ProductDialog.jsx";

const users = [
  { title: "Name", field: "name" },
  { title: "Surename", field: "surname" },
  { title: "Email", field: "email" },
  { title: "Telephone", field: "telephone", type: "numeric" },
  { title: "Address", field: "address" }
];

const usersData = [
  {
    name: "Juan Luis",
    surname: "Flores",
    email: "jl@gmail.com",
    telephone: "1234567890",
    address: "Test"
  },
  {
    name: "Abril",
    surname: "Gonzalez",
    email: "a@gmail.com",
    telephone: "1234567890",
    address: "Test"
  }
];

const products = [
  { title: "Title", field: "title" },
  { title: "Description", field: "description" },
  { title: "Price", field: "price", type: "numeric" },
  { title: "Stock", field: "inStock", type: "numeric" },
  { title: "Bought", field: "numbBought", type: "numeric" }
];

const productsData = [
  {
    title: "Planta 1",
    description: "Planta 1",
    price: "230",
    inStock: "6",
    numbBought: "4"
  },
  {
    title: "Planta 2",
    description: "Planta 2",
    price: "430",
    inStock: "1",
    numbBought: "5"
  }
];

export default class DemoTable extends Component {
  render() {
    return (
      <div>
        {(() => {
          switch (this.props.url) {
            case "dashboard":
              return (
                <Fragment>
                  <MaterialTable
                    columns={users}
                    data={usersData}
                    title="Users"
                  />
                  <br />
                  <MaterialTable
                    columns={products}
                    data={productsData}
                    title="Products"
                  />
                </Fragment>
              );
            case "products":
              return (
                <Fragment>
                  <ProductDialog />
                  <br />
                  <MaterialTable
                    columns={products}
                    data={productsData}
                    title="Products"
                  />
                </Fragment>
              );
            case "orders":
              return null;
            case "users":
              return (
                <MaterialTable columns={users} data={usersData} title="Users" />
              );
            default:
              return null;
          }
        })()}
      </div>
    );
  }
}
