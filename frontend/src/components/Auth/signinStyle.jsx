// SignIn Styles
// import loginBg from "../../../assets/images/loginbg.jpg";
// import loginBg2 from "../../../assets/images/reajustes-01.png";

const signinStyle = theme => ({
  root: {
    flexGrow: 1,
    position: "relative",
    overflow: "hidden",
    display: "flex",
    height: "100%",
    minHeight: "100vh",
    // backgroundImage: "url(" + loginBg2 + ")",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center"
  },
  container: {
    marginTop: "10%",
    width: "auto",
    display: "block", // Fix IE11 issue.
    marginRight: theme.spacing.unit * 3,
    marginLeft: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  form: {
    width: "100%", // Fix IE11 issue.
    marginTop: theme.spacing.unit
  },
  noDeco: {
    textDecoration: "none",
    width: "100%"
  },
  submit: {
    marginTop: theme.spacing.unit * 3
  },
  iconBack: {
    minHeight: "30px",
    width: "auto"
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 3}px`
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main
  }
});

export default signinStyle;
