import React, { Component } from "react";
// Components
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Hidden from "@material-ui/core/Hidden";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Notification from "../Notification/Notification";
import { withStyles } from "@material-ui/core/styles";
// Icons
import AddIcon from "@material-ui/icons/Add";
import Remove from "@material-ui/icons/Remove";
// Redux
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  checkout,
  addToCart,
  removeFromCart
} from "../../../actions/cartActions";
import { getVisibleProducts } from "../../../reducers/Cart/productsReducer";
import { getTotal, getCartProducts } from "../../../reducers";

const styles = theme => ({
  card: {
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
  }
});

class Cart extends Component {
  queue = [];
  state = {
    notif: false,
    messageInfo: {}
  };

  addCart = item => {
    // console.log(item);
    this.handleClick(item.title, "a");
    this.props.addToCart(item.id);
  };

  removeCart = item => {
    // console.log(item);
    this.handleClick(item.title, "r");
    this.props.removeFromCart(item.id);
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
        <Grid item key={product.id} xs={12} md={6}>
          <Card className={classes.card}>
            <div className={classes.cardDetails}>
              <CardContent>
                <Typography component="h2" variant="h5">
                  {product.title}
                </Typography>
                <Typography variant="subtitle1" paragraph>
                  {product.description}
                </Typography>
                <Typography variant="subtitle1" color="primary">
                  {product.title} - &#36;{product.price}
                  {product.quantity ? ` x ${product.quantity}` : null}
                </Typography>
                <Button
                  variant="contained"
                  className={classes.button}
                  onClick={this.addCart.bind(this, product)}
                  disabled={
                    this.props.storeProducts[product.id - 1].inStock > 0
                      ? false
                      : true
                  }
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
                image={product.thumb}
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
        <h3>Your Cart</h3>
        <Grid container spacing={40}>
          {nodes}
        </Grid>
        <p>Total: &#36;{this.props.total}</p>
        <button
          onClick={checkout(this.props.cartProducts)}
          disabled={hasProducts ? "" : "disabled"}
        >
          Checkout
        </button>
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
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      quantity: PropTypes.number.isRequired
    })
  ).isRequired,
  storeProducts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      inStock: PropTypes.number.isRequired
    })
  ).isRequired,
  total: PropTypes.string,
  checkout: PropTypes.func.isRequired,
  addToCart: PropTypes.func.isRequired,
  removeFromCart: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  cartProducts: getCartProducts(state),
  storeProducts: getVisibleProducts(state.products),
  total: getTotal(state)
});

export default connect(
  mapStateToProps,
  { checkout, addToCart, removeFromCart }
)(withStyles(styles, { withTheme: true })(Cart));
