import React, { Component } from "react";
// Components
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
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
    messageInfo: {}
  };

  addCart = item => {
    //console.log(item);
    this.handleClick(item.title, "a");
    this.props.addToCart(item.id);
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

    return (
      <div className={classNames(classes.layout, classes.cardGrid)}>
        <Grid container spacing={40}>
          {this.props.products.map(node => (
            <Grid item key={node.id} xs={12} sm={6} md={4} lg={3}>
              <Card className={classes.card}>
                <CardContent className={classes.cardContent}>
                  <Typography variant="h5" className={classes.button}>
                    {node.title}
                  </Typography>
                </CardContent>
                <CardMedia
                  className={classes.cardMedia}
                  image={node.thumb}
                  title={node.title}
                />
                <CardContent className={classes.cardContent}>
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
          ))}
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
      id: PropTypes.number.isRequired,
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
