/* eslint-disable react/display-name */
import React, { forwardRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Settings from "@material-ui/icons/Settings";

import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import clsx from "clsx";
import { Typography } from "@material-ui/core";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    backgroundColor: theme.palette.primary.dark,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
  },
  brand: {
    width: "100%",
    backgroundImage:
      'url("https://www.redhat.com/cms/managed-files/Brand_Standards_RH-IBM_Assets_Red_Hat.svg")',
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  title: {
    color: theme.palette.getContrastText(theme.palette.primary.dark),
  },
  controls: {
    marginLeft: "auto",
  },
  toolbarIcon: {
    color: theme.palette.getContrastText(theme.palette.primary.dark),
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
  },
  appletContainer: {
    
  }
}));

const Layout = ({ children }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography noWrap variant="h6" className={classes.title}>
            Chrome 2.0
          </Typography>
          <div className={classes.controls}>
            <Settings className={classes.toolbarIcon} />
            <AccountCircle className={classes.toolbarIcon} />
          </div>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
      >
        <div className={clsx(classes.toolbar, classes.brand)}></div>
        <Divider />
        <List>
          {[
            { label: "App one", to: "/app-one" },
            { label: "App two", to: "/app-two" },
          ].map(({ label, to }, index) => (
            <ListItem
              button
              key={to}
              to={to}
              component={forwardRef(({ children, ...props }, ref) => (
                <Link {...props}>
                  <ListItemIcon>
                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                  </ListItemIcon>
                  <ListItemText primary={label} />
                </Link>
              ))}
            />
          ))}
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <div className={classes.appletContainer}>{children}</div>
      </main>
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
};

export default Layout;
