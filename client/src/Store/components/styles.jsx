import HeroImg from "../assets/hero3.jpg";

const styles = theme => ({
  layout: {
    width: "auto",
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
      width: 1100,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  grow: {
    flexGrow: 1
  },
  socialIcons: {
    margin: 6.5
  },
  toolbarMain: {
    borderBottom: `1px solid ${theme.palette.grey[300]}`
  },
  toolbarTitle: {
    flexGrow: 0,
    margin: 10,
    width: 60,
    height: 60
  },
  toolbarSecondary: {
    justifyContent: "space-between"
  },
  heroLogo: {
    height: 200,
    [theme.breakpoints.down("sm")]: {
      height: 120
    },
    width: "auto",
    borderRadius: 20
  },
  mainFeaturedPost: {
    backgroundImage: "url('" + HeroImg + "')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    // backgroundColor: theme.palette.grey[800],
    color: theme.palette.common.white,
    marginBottom: theme.spacing.unit * 4
  },
  mainFeaturedPostContent: {
    padding: `${theme.spacing.unit * 6}px`,
    [theme.breakpoints.up("md")]: {
      paddingRight: 0
    }
  },
  mainFeaturedPostContentText: {
    [theme.breakpoints.down("sm")]: {
      fontSize: 20
    }
  },
  mainGrid: {
    marginTop: theme.spacing.unit * 3
  },
  card: {
    display: "flex"
  },
  cardDetails: {
    flex: 1
  },
  cardMedia: {
    width: 160
  },
  markdown: {
    padding: `${theme.spacing.unit * 3}px 0`
  },
  sidebarAboutBox: {
    padding: theme.spacing.unit * 2,
    backgroundColor: theme.palette.grey[200]
  },
  sidebarSection: {
    marginTop: theme.spacing.unit * 3
  },
  footer: {
    backgroundColor: theme.palette.grey[200],
    marginTop: theme.spacing.unit * 4,
    padding: `${theme.spacing.unit * 1}px 0`
  },
  button: {
    marginLeft: 10
  }
});

export default styles;
