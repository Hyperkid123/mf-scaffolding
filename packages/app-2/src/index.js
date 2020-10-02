import { initializeApp } from "core-functions";
import Container from "@material-ui/core/Container";
import {
  makeStyles,
  ThemeProvider,
  createMuiTheme,
} from "@material-ui/core/styles";
import React, { Fragment, lazy, Suspense } from "react";
import { Switch, BrowserRouter, Route, Link } from "react-router-dom";
import { grey, red } from "@material-ui/core/colors";
import Typography from "@material-ui/core/Typography";
import CardsList from "./cards-list";

import {
  StylesProvider,
  createGenerateClassName,
} from "@material-ui/core/styles";

const PageOne = lazy(() => import("./page-1"));
const PageTwo = lazy(() => import("./page-2"));

const url = new URL(document.currentScript.src);
__webpack_public_path__ = `${url.origin}/${__webpack_public_path__}`;

const generateClassName = createGenerateClassName({
  productionPrefix: "appOne",
  seed: "appOne",
});

const useStyles = makeStyles((theme) => ({
  root: {
    padding: 8,
    margin: 0,
    minHeight: "100%",
  },
  title: {
    textAlign: "center",
  },
}));

const AppTwo = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Container>
        <BrowserRouter basename="/app-two">
          <Link to="/">
            <Typography className={classes.title} variant="h3" component="h1">
              App two
            </Typography>
          </Link>
          <Suspense fallback={<Fragment></Fragment>}>
            <Switch>
              <Route path="/page-one">
                <PageOne />
              </Route>
              <Route path="/page-two">
                <PageTwo />
              </Route>
              <Route>
                <CardsList />
              </Route>
            </Switch>
          </Suspense>
        </BrowserRouter>
      </Container>
    </div>
  );
};

const theme = createMuiTheme({
  palette: {
    primary: grey,
    secondary: red,
  },
});

const Root = () => (
  <StylesProvider generateClassName={generateClassName}>
    <ThemeProvider theme={theme}>
      <AppTwo />
    </ThemeProvider>
  </StylesProvider>
);
initializeApp(Root, { id: "app-two-root", name: "appTwo" });
