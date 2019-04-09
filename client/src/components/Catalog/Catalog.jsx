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
// Styles
import styles from "./style";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
// Icons
import CartIcon from "@material-ui/icons/ShoppingCart";
// Config
import { productCatalog } from "../config";

class Catalog extends React.Component {
  state = {
    notif: false
  };

  handleNotif = () => {
    this.setState({ notif: true });
  };

  handleCloseNotif = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classNames(classes.layout, classes.cardGrid)}>
        <Grid container spacing={40}>
          {productCatalog.map(value => (
            <Grid item key={value.id} xs={12} sm={6} md={4} lg={3}>
              <Card className={classes.card}>
                <CardMedia
                  className={classes.cardMedia}
                  image={value.thumb}
                  title={value.name}
                />
                <CardContent className={classes.cardContent} />
                <CardActions className={classes.CardActions}>
                  <Button
                    variant="outlined"
                    color="primary"
                    className={classes.button}
                  >
                    Ver
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    onClick={this.handleNotif}
                  >
                    <CartIcon />
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
        <Notification
          msg="Agregado a Carrito"
          open={this.state.notif}
          handleCloseNotif={this.handleCloseNotif}
        />
      </div>
    );
  }
}

Catalog.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(Catalog);
