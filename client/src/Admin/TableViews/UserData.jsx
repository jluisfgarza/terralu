import React, { Component, Fragment } from "react";
import axios from "axios";
import MaterialTable from "material-table";
import AlertDialog from "../../Store/components/Alert/Alert";

const users = [
  { title: "Name", field: "name" },
  { title: "Surename", field: "surname" },
  { title: "Email", field: "email" },
  { title: "Telephone", field: "telephone", type: "numeric" },
  { title: "Address", field: "address" }
];

class UserData extends Component {
  constructor() {
    super();
    this.state = {
      usersData: [],
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
      .get("/api/users")
      .then(res => {
        const usersData = res.data;
        this.setState({ usersData });
      })
      .catch(error => {
        this.setState({
          openAlert: true,
          alertMessage: "Error could not fetch Users",
          alertTitle: "Error"
        });
      });
  }

  render() {
    return (
      <Fragment>
        <MaterialTable
          columns={users}
          data={this.state.usersData}
          title="Users"
          options={{ columnsButton: true, exportButton: true }}
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

export default UserData;
