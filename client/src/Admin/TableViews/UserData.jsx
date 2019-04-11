import React, { Component } from "react";
import axios from "axios";
import MaterialTable from "material-table";

const users = [
    { title: "Name", field: "name" },
    { title: "Surename", field: "surname" },
    { title: "Email", field: "email" },
    { title: "Telephone", field: "telephone", type: "numeric" },
    { title: "Address", field: "address" }
];

class UserData extends Component {
  constructor(){
    super();
    this.state ={usersData: []};
  }
  componentDidMount(){
    axios.get("/api/users")
    .then((res)=>{
      const usersData = res.data;
      this.setState({usersData});
    }).catch((error)=>{
      alert("Error could not fetch Users");
    });
  }
  render(){
    return(
      <MaterialTable
        columns={users}
        data={this.state.usersData}
        title="Users"
      />
    );
  }
}

export default UserData;
