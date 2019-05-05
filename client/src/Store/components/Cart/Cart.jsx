import React, { Component, Fragment } from "react";
import axios from "axios";
// Components
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Hidden from "@material-ui/core/Hidden";
import Fab from "@material-ui/core/Fab";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Notification from "../Notification/Notification";
import AlertDialog from "../Alert/Alert";
import { withStyles } from "@material-ui/core/styles";
// Icons
import AddIcon from "@material-ui/icons/Add";
import Remove from "@material-ui/icons/Remove";
import Clear from "@material-ui/icons/Clear";
// Redux
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  checkout,
  addToCart,
  removeFromCart,
  removeProductFromCart,
  clearCart
} from "../../../actions/cartActions";
import { getVisibleProducts } from "../../../reducers/Cart/productsReducer";
import { getTotal, getCartProducts } from "../../../reducers";
// Paypal
import PaypalExpressBtn from "react-paypal-express-checkout";
// Auth
import { setCurrentUser } from "../../../actions/authActions";
import store from "../../../store";

const styles = theme => ({
  card: {
    position: "relative",
    display: "flex"
  },
  cardDetails: {
    flex: 1
  },
  cardMedia: {
    width: 195
  },
  button: {
    margin: theme.spacing.unit
  },
  cancel: {
    position: "absolute",
    right: 15
  }
});

class Cart extends Component {
  queue = [];
  state = {
    notif: false,
    messageInfo: {},
    openAlert: false,
    alertMessage: "",
    alertTitle: ""
  };

  addCart = item => {
    // console.log(item);
    this.handleClick(item.title, "a");
    this.props.addToCart(item._id);
  };

  removeProduct = item => {
    // console.log(item);
    this.handleClick(item.title, "r");
    this.props.removeProductFromCart(item);
  };

  removeCart = item => {
    // console.log(item);
    this.handleClick(item.title, "r");
    this.props.removeFromCart(item._id);
  };

  handleClick = (message, c) => {
    this.queue.push({
      message,
      c,
      key: new Date().getTime()
    });

    if (this.state.notif) {
      this.setState({ notif: false });
    } else {
      this.processQueue();
    }
  };

  processQueue = () => {
    if (this.queue.length > 0) {
      this.setState({
        messageInfo: this.queue.shift(),
        notif: true
      });
    }
  };

  handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    this.setState({ notif: false });
  };

  handleExited = () => {
    this.processQueue();
  };

  handleCloseAlert = () => {
    this.setState({ openAlert: false });
  };

  render() {
    const { classes } = this.props;
    const hasProducts = this.props.cartProducts.length > 0;
    const nodes = hasProducts ? (
      this.props.cartProducts.map(product => (
        <Grid item key={product._id} xs={12} md={6}>
          <Card className={classes.card}>
            <div className={classes.cardDetails}>
              <CardContent>
                <Fab
                  size="small"
                  color="primary"
                  aria-label="Add"
                  className={classes.cancel}
                  onClick={this.removeProduct.bind(this, product)}
                >
                  <Clear />
                </Fab>
                <br />
                <Typography component="h2" variant="h5">
                  {product.title}
                </Typography>
                <Typography variant="subtitle1" color="primary">
                  &#36;{product.price}
                  {product.quantity ? ` x ${product.quantity}` : null}
                </Typography>
                <Button
                  variant="contained"
                  className={classes.button}
                  onClick={this.addCart.bind(this, product)}
                >
                  <AddIcon />
                </Button>
                <Button
                  variant="contained"
                  className={classes.button}
                  onClick={this.removeCart.bind(this, product)}
                  disabled={product.quantity > 0 ? false : true}
                >
                  <Remove />
                </Button>
              </CardContent>
            </div>
            <Hidden xsDown>
              <CardMedia
                className={classes.cardMedia}
                image={
                  process.env.PUBLIC_URL + "/images/products/" + product.image
                }
                title={product.title}
              />
            </Hidden>
          </Card>
        </Grid>
      ))
    ) : (
      <Grid item xs={12} md={12}>
        <Typography variant="subtitle1" color="primary">
          Please add some products to cart.
        </Typography>
      </Grid>
    );
    const client = {
      sandbox:
        "AXakxr_puudDtU6zqQn8B3OpoboFMxx7bdjQ8bSLyYtmweGRBz4WtdbZuupXKyM1yF27JCZwDMVCNwMB",
      production: ""
    };
    const onSuccess = payment => {
      console.log("Payment successful!", payment);
      //Post order on orders collection
      axios
        .post(`http://localhost:5000/api/orders`, {
          username: this.props.user.id,
          userEmail: this.props.user.email,
          address: this.props.user.address,
          products: this.props.cartProducts,
          total: this.props.total,
          paypalId: payment.paymentID
        })
        .then(res => {
          let torder = this.props.user.orders;
          torder.push(res.data._id);
          axios.put(`http://localhost:5000/api/users/order`, {
            _id: this.props.user.id,
            orders: torder
          });
          // Update current user session
          if (localStorage.jwtToken) {
            let userData = this.props.user;
            store.dispatch(setCurrentUser(userData));
          }
          // Update each product stock
          res.data.products.forEach(function(element) {
            console.log(element);
            axios
              .put(
                `http://localhost:5000/api/products/updateStockBought/${
                  element._id
                }`,
                {
                  _id: element._id,
                  inStock: element.inStock - element.quantity,
                  numBought: element.numBought + element.quantity
                }
              )
              .catch(error => {
                console.log(error.response);
              });
          });
        })
        .catch(error => {
          console.log(error.response);
          this.setState({
            openAlert: true,
            alertMessage: "Error could save user order",
            alertTitle: "Error"
          });
        });
      this.props.clearCart();
      // You can bind the "payment" object's value to your state or props or whatever here, please see below for sample returned data
    };
    const onCancel = data => {
      // The user pressed "cancel" or closed the PayPal popup
      console.log("Payment cancelled!", data);
      this.setState({
        openAlert: true,
        alertMessage: "Pago cancelado",
        alertTitle: "Error"
      });
      // You can bind the "data" object's value to your state or props or whatever here, please see below for sample returned data
    };
    const onError = err => {
      // The main Paypal script could not be loaded or something blocked the script from loading
      console.log("Error!", err);
      this.setState({
        openAlert: true,
        alertMessage: "Error, intenta de nuevo por favor",
        alertTitle: "Error"
      });
    };

    return (
      <Fragment>
        <Typography component="h2" variant="h5">
          Your Cart
        </Typography>
        <br />
        <Grid container spacing={40}>
          <Grid item xs={12}>
            <Button
              variant="outlined"
              color="primary"
              onClick={this.props.clearCart}
            >
              Clear Cart
            </Button>
          </Grid>
          {nodes}
          <br />
          <Grid item xs={12} md={8} sm={8} lg={8} />
          <Grid item xs={12} md={4} sm={4} lg={4}>
            <Typography variant="h4" color="primary" className={classes.button}>
              Total: &#36;{this.props.total}
            </Typography>
            <PaypalExpressBtn
              env={"sandbox"}
              client={client}
              currency={"MXN"}
              total={parseFloat(this.props.total)}
              onError={onError}
              onSuccess={onSuccess}
              onCancel={onCancel}
            />
          </Grid>
        </Grid>
        <Notification
          msg={this.state.messageInfo}
          open={this.state.notif}
          handleClose={this.handleClose}
          handleExited={this.handleExited}
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

Cart.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  cartProducts: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      quantity: PropTypes.number.isRequired
    })
  ).isRequired,
  storeProducts: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      inStock: PropTypes.number.isRequired
    })
  ).isRequired,
  total: PropTypes.string,
  checkout: PropTypes.func.isRequired,
  addToCart: PropTypes.func.isRequired,
  removeFromCart: PropTypes.func.isRequired,
  removeProductFromCart: PropTypes.func.isRequired,
  clearCart: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  cartProducts: getCartProducts(state),
  storeProducts: getVisibleProducts(state.products),
  total: getTotal(state)
});

export default connect(
  mapStateToProps,
  { checkout, addToCart, removeFromCart, removeProductFromCart, clearCart }
)(withStyles(styles, { withTheme: true })(Cart));
