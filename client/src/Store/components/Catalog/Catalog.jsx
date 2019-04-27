import React, { Component } from "react";
// Components
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";
import Notification from "../Notification/Notification";
import Typography from "@material-ui/core/Typography";
// Styles
import styles from "./style";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
// Icons
import CartIcon from "@material-ui/icons/ShoppingCart";
// Redux
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addToCart } from "../../../actions/cartActions";
import { getVisibleProducts } from "../../../reducers/Cart/productsReducer";

class Catalog extends Component {
  queue = [];
  state = {
    notif: false,
    messageInfo: {},
    loading: true
  };

  addCart = item => {
    //console.log(item);
    if (this.props.user.isAuthenticated) {
      this.handleClick(item.title, "a");
      this.props.addToCart(item._id);
    } else {
      alert("Para poder comprar se necesita crear una cuenta!");
      window.location.href = "./register";
    }
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

  componentDidMount = () => {
    if (this.props.products.length > 0) {
      this.setState({
        loading: false
      });
      console.log(this.props.products);
    }
  };

  componentDidUpdate(prevProps) {
    if (prevProps.products !== this.props.products) {
      this.setState({
        loading: false
      });
      console.log(prevProps.products);
      console.log(this.props.products);
    }
  }

  render() {
    const { classes } = this.props;

    const render = this.state.loading ? (
      <CircularProgress disableShrink className={classes.center} />
    ) : (
      this.props.products &&
      this.props.products.map(node => (
        <Grid item key={node._id} xs={12} sm={6} md={4} lg={3}>
          <Card className={classes.card}>
            <CardMedia
              className={classes.cardMedia}
              image={process.env.PUBLIC_URL + '/images/'+ node.image}
              title={node.title}
            />
            <CardContent className={classes.cardContent}>
              <Typography variant="h5" className={classes.button}>
                {node.title}
              </Typography>
              <Typography className={classes.pos} color="textSecondary">
                {node.description}
              </Typography>
            </CardContent>
            <CardActions className={classes.CardActions}>
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                onClick={this.addCart.bind(this, node)}
                disabled={node.inStock > 0 ? false : true}
              >
                <CartIcon />
              </Button>
              <Typography
                variant="h6"
                color="textSecondary"
                className={classes.button}
              >
                {node.inStock > 0 ? `$${node.price} MXN` : "Out of Stock"}
              </Typography>
            </CardActions>
          </Card>
        </Grid>
      ))
    );

    return (
      <div className={classNames(classes.layout, classes.cardGrid)}>
        <Grid container spacing={40}>
          {render}
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

Catalog.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  products: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      inStock: PropTypes.number.isRequired
    })
  ).isRequired,
  addToCart: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  products: getVisibleProducts(state.products)
});

export default connect(
  mapStateToProps,
  { addToCart }
)(withStyles(styles, { withTheme: true })(Catalog));
