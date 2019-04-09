import React from "react";
import PropTypes from "prop-types";
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
import { connect } from "react-redux";
import { addToCart } from "../../actions/cartActions";
import { getVisibleProducts } from "../../reducers/Cart/productsReducer";

class Catalog extends React.Component {
  state = {
    notif: false,
    clickedItem: ""
  };

  addCart = item => {
    this.handleNotif();
    this.setState({ clickedItem: item.title });
    this.props.addToCart(item.id);
  };

  handleNotif = () => {
    this.setState({ notif: true });
  };

  handleCloseNotif = (event, reason) => {
    // if (reason === "clickaway") {
    // }
    this.setState({ notif: false });
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
                    disabled={node.inStock > 0 ? "" : "disabled"}
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
          msg={"Agregado a Carrito: " + this.state.clickedItem}
          open={this.state.notif}
          handleCloseNotif={this.handleCloseNotif}
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
      inStock: PropTypes.number.isRequired,
      numBought: PropTypes.number.isRequired
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
