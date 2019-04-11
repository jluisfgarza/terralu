import React, { Component } from "react";
import axios from "axios";
import MaterialTable from "material-table";

const products = [
  { title: "Title", field: "title" },
  { title: "Description", field: "description" },
  { title: "Price", field: "price", type: "numeric" },
  { title: "Stock", field: "inStock", type: "numeric" },
  { title: "Bought", field: "numBought", type: "numeric" }
];

class ProductData extends Component{
  constructor(){
    super();
    this.state={productsData:[]};
  }
  componentDidMount(){
    axios.get("/api/products")
    .then((res)=>{
      const productsData = res.data;
      this.setState({productsData});
    }).catch((error)=>{
      alert("Error could not fetch Products");
    });
  }
  render(){
    return(
      <MaterialTable
        columns={products}
        data={this.state.productsData}
        title="Products"
      />
    );
  }
}  
export default ProductData;