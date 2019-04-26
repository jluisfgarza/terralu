import React, { Component } from "react";
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

//import paypal button
import PayPalButton from "react-paypal-button";

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
    messageInfo: {}
  };

  //toma el item y lo convierte
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
                image={process.env.PUBLIC_URL + "/images/" + product.image}
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

    return (
      <div>
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
            <Button
              onClick={checkout(this.props.cartProducts)}
              disabled={hasProducts ? false : true}
              variant="contained"
              color="primary"
              className={classes.button}
            >
              Checkout
            </Button>
          </Grid>
        </Grid>
        <Notification
          msg={this.state.messageInfo}
          open={this.state.notif}
          handleClose={this.handleClose}
          handleExited={this.handleExited}
        />
      </div>
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
