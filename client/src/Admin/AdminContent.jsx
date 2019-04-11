import React, { Component, Fragment } from "react";
// Components
import Typography from "@material-ui/core/Typography";
import ProductDialog from "./ProductDialog.jsx";
import ProductData from "./TableViews/ProductData";
import OrderData from "./TableViews/OrderData";
import UserData from "./TableViews/UserData";
// Styles
import { withStyles } from "@material-ui/core/styles";
import style from "./adminStyle";

class AdminContent extends Component {
  render() {
    const { classes } = this.props;
    return (
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Typography variant="h4" gutterBottom>
          {this.props.url}
        </Typography>
        <br />
        {(() => {
          switch (this.props.url) {
            case "Dashboard":
              return (
                <Fragment>
                  <UserData />
                  <br />
                  <ProductData />
                </Fragment>
              );
            case "Products":
              return (
                <Fragment>
                  <ProductDialog />
                  <br />
                  <ProductData />
                </Fragment>
              );
            case "Orders":
              return (
                <Fragment>
                  <OrderData />
                </Fragment>
              );
            case "Users":
              return <UserData />;
            default:
              return null;
          }
        })()}
      </main>
    );
  }
}

export default withStyles(style, { withTheme: true })(AdminContent);
