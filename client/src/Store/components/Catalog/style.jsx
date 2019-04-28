const styles = theme => ({
  layout: {
    width: "auto",
    // marginLeft: theme.spacing.unit * 3,
    // marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
      width: 1100,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  cardGrid: {
    padding: `${theme.spacing.unit * 8}px 0`
  },
  card: {
    marginLeft: "auto",
    marginRight: "auto",
    height: "100%",
    maxWidth: 350,
    display: "flex",
    flexDirection: "column"
  },
  cardMedia: {
    // paddingTop: "56.25%" // 16:9
    paddingTop: "100%" // 16:9
  },
  cardContent: {
    flexGrow: 1,
    paddingTop: 10,
    paddingBottom: 0,
    paddingLeft: 25,
    paddingRight: 25
  },
  CardActions: {
    // flexGrow: 1
  },
  button: {
    margin: theme.spacing.unit,
    marginLeft: "auto",
    marginRight: "auto"
  },
  center: {
    marginLeft: "auto",
    marginRight: "auto"
  }
});

export default styles;
