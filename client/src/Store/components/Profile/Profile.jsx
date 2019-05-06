import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import MaterialTable from "material-table";
import axios from "axios";

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  card: {
    minWidth: 275
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  }
});

const orders = [
  { title: "Order ID", field: "_id" },
  { title: "Address", field: "address" },
  // { title: "Products", field: "products" },
  { title: "Total", field: "total", type: "numeric" },
  { title: "Paypal ID", field: "paypalId" },
  { title: "Status", field: "Status", hidden: true },
  { title: "Date", field: "date", type: "date" }
];

class Profile extends Component {
  constructor() {
    super();
    this.state = { ordersData: [] };
  }
  componentDidMount() {
    axios
      .post(`/api/orders/ids`, {
        OrderIds: this.props.user.orders
      })
      .then(res => {
        this.setState({ ordersData: res.data });
        // console.log(res.data);
      });
    // console.log(this.props.user);
  }
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Card className={classes.card}>
          <CardContent>
            <Typography
              className={classes.title}
              color="textSecondary"
              gutterBottom
            >
              Perfil
            </Typography>
            <Typography variant="h5" component="h2">
              {"Nombre: " + this.props.user.name}
            </Typography>
            <Typography className={classes.pos} color="textSecondary">
              <br />
              {"Email: " + this.props.user.email} <br />
            </Typography>
            <Typography className={classes.pos} color="textSecondary">
              {"Address: " + this.props.user.address} <br />
            </Typography>
            <Typography className={classes.pos} color="textSecondary">
              {"Teléfono: " + this.props.user.telephone}
            </Typography>
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
                pageSize: 5,
                doubleHorizontalScroll: false,
                columnsButton: true,
                exportButton: true
              }}
            />
          </CardContent>
        </Card>
      </div>
    );
  }
}

Profile.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Profile);
