import React, { Component } from "react";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton";
// Styles
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import style from "./adminStyle";
// Icons
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import StoreMallDirectory from "@material-ui/icons/StoreMallDirectory";
import Dashboard from "@material-ui/icons/Dashboard";
import FilterVintage from "@material-ui/icons/FilterVintage";
import Receipt from "@material-ui/icons/Receipt";
import SupervisedUserCircle from "@material-ui/icons/SupervisedUserCircle";
import ExitToApp from "@material-ui/icons/ExitToApp";
// Router
import { Link } from "react-router-dom";

class Sidebar extends Component {
  render() {
    const { classes, theme } = this.props;
    return (
      <div>
        <Drawer
          variant="permanent"
          className={classNames(classes.drawer, {
            [classes.drawerOpen]: this.props.open,
            [classes.drawerClose]: !this.props.open
          })}
          classes={{
            paper: classNames({
              [classes.drawerOpen]: this.props.open,
              [classes.drawerClose]: !this.props.open
            })
          }}
          open={this.props.open}
        >
          <div className={classes.toolbar}>
            <IconButton onClick={this.props.handleDrawerClose}>
              {theme.direction === "rtl" ? (
                <ChevronRightIcon />
              ) : (
                <ChevronLeftIcon />
              )}
            </IconButton>
          </div>
          <Divider />
          <List>
            <Link to="/store">
              <ListItem button key="Store">
                <ListItemIcon>
                  <StoreMallDirectory />
                </ListItemIcon>
                <ListItemText primary="Store" />
              </ListItem>
            </Link>
            <Link to="/admin/dashboard">
              <ListItem button key="Dashboard">
                <ListItemIcon>
                  <Dashboard />
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
              </ListItem>
            </Link>
            <Link to="/admin/products">
              <ListItem button key="Products">
                <ListItemIcon>
                  <FilterVintage />
                </ListItemIcon>
                <ListItemText primary="Products" />
              </ListItem>
            </Link>
            <Link to="/admin/orders">
              <ListItem button key="Orders">
                <ListItemIcon>
                  <Receipt />
                </ListItemIcon>
                <ListItemText primary="Orders" />
              </ListItem>
            </Link>
            <Link to="/admin/users">
              <ListItem button key="Users">
                <ListItemIcon>
                  <SupervisedUserCircle />
                </ListItemIcon>
                <ListItemText primary="Users" />
              </ListItem>
            </Link>
          </List>
          <Divider />
          <List>
            <ListItem button key="LogOut" onClick={this.props.handleLogOut}>
              <ListItemIcon>
                <ExitToApp />
              </ListItemIcon>
              <ListItemText primary="Log Out" />
            </ListItem>
          </List>
        </Drawer>
      </div>
    );
  }
}

export default withStyles(style, { withTheme: true })(Sidebar);
