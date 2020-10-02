import React, { useEffect, useState } from "react";
import ReactDom from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { initializeScaffolding } from "core-functions";
import ScaffoldingContext from "./scaffolding-context";
import GenericRoute from "./generic-route";
import Layout from "./layout";
import {
  createMuiTheme,
  makeStyles,
  ThemeProvider,
  Typography,
} from "@material-ui/core";
import { grey, red } from "@material-ui/core/colors";

window.React = React;
window.ReactDom = ReactDom;

const feedMock = () =>
  Promise.resolve({
    appOne: {
      dest: "http://localhost:8081/main.js",
      location: "/app-one",
    },
    appTwo: {
      dest: "http://localhost:8082/main.js",
      location: "/app-two",
    },
  });

const theme = createMuiTheme({
  palette: {
    primary: grey,
    secondary: red,
  },
});

const useStyles = makeStyles(() => ({
  emptyText: {
    textAlign: "center",
    height: "calc(100vh - 64px * 1.8)",
  },
}));

const Scaffolding = () => {
  const [initialized, setInitialized] = useState(false);
  useEffect(() => {
    feedMock().then((data) => {
      initializeScaffolding(data);
      setInitialized(true);
    });
  }, []);
  const classes = useStyles();
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Layout>
          <ScaffoldingContext.Provider value={{ initialized }}>
            <Switch>
              <Route path="/app-one">
                <GenericRoute path="/app-one" />
              </Route>
              <Route path="/app-two">
                <GenericRoute path="/app-two" />
              </Route>
              <Route>
                <div className={classes.emptyText}>
                  <Typography variant="h2">Chrome 2.0 scaffolding</Typography>
                </div>
              </Route>
            </Switch>
          </ScaffoldingContext.Provider>
        </Layout>
      </ThemeProvider>
    </BrowserRouter>
  );
};

const wrapper = document.getElementById("root");
ReactDom.render(<Scaffolding />, wrapper);
