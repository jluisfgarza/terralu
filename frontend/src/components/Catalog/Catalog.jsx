import React from "react";
import PropTypes from "prop-types";
// Styles
import styles from "./style";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Grid from "@material-ui/core/Grid";
// Icons
import CartIcon from "@material-ui/icons/ShoppingCart";
// Config
import { productCatalog } from "../config";

class Catalog extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <div className={classNames(classes.layout, classes.cardGrid)}>
        <Grid container spacing={40}>
          {productCatalog.map(value => (
            <Grid item key={value} sm={6} md={4} lg={3}>
              <Card className={classes.card}>
                <CardMedia
                  className={classes.cardMedia}
                  image={value.thumb}
                  title={value.name}
                />
                <CardContent className={classes.cardContent}>
                  <Typography gutterBottom variant="h5" component="h2">
                    {value.name}
                  </Typography>
                  {/* <Typography>{value.description}</Typography> */}
                </CardContent>
                <CardActions className={classes.CardActions}>
                  <Button variant="outlined" size="medium" color="primary">
                    Ver
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                  >
                    <CartIcon />
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
    );
  }
}

Catalog.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(Catalog);
