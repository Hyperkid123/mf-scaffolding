import React, { useEffect, useState, createContext, useContext } from "react";
import PropTypes from "prop-types";
import { render, unmountComponentAtNode } from "react-dom";
import {
  BrowserRouter,
  Link,
  Route,
  Switch,
  useLocation,
  useRouteMatch,
} from "react-router-dom";
import {
  getAppsByPathname,
  getApp,
  initializeScaffolding,
} from "core-functions";

const ScaffoldingContext = createContext({ initialized: false });

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

const GenericRoute = ({ path }) => {
  const [{ id, Component, appPathname }, setComponent] = useState({});
  const { initialized } = useContext(ScaffoldingContext);
  const { path: pathname } = useRouteMatch(path);
  useEffect(() => {
    if (initialized) {
      const { dest, name } = getAppsByPathname(pathname)[0];
      if (!getApp(name)) {
        let s;
        const InjectScriptPromise = new Promise((res, rej) => {
          s = document.createElement("script");
          s.src = dest;
          s.onload = (...args) => {
            res(name);
          };
          s.onerror = (...args) => {
            console.log(args);
            rej(args);
          };
        });
        document.body.appendChild(s);
        InjectScriptPromise.then((name) => {
          const app = getApp(name);
          if (appPathname && pathname !== appPathname) {
            unmountComponentAtNode(document.getElementById(id));
          }
          setComponent({
            id: app.nodeId,
            Component: app.Component,
            appPathname: pathname,
          });
        });
      } else {
        const app = getApp(name);
        if (appPathname && pathname !== appPathname) {
          unmountComponentAtNode(document.getElementById(id));
        }
        setComponent({
          id: app.nodeId,
          Component: app.Component,
          appPathname: pathname,
        });
      }
    }
  }, [pathname, initialized]);
  useEffect(() => {
    if (Component) {
      render(<Component />, document.getElementById(id));
    }
  }, [Component]);
  return <div id={id}></div>;
};

GenericRoute.propTypes = {
  path: PropTypes.string.isRequired,
};

const Scaffolding = () => {
  const [initialized, setInitialized] = useState(false);
  useEffect(() => {
    feedMock().then((data) => {
      initializeScaffolding(data);
      setInitialized(true);
    });
  }, []);
  return (
    <BrowserRouter>
      <h1>Scaffolding</h1>
      <ul>
        <li>
          <Link to="/app-one">App one</Link>
        </li>
        <li>
          <Link to="/app-two">App two</Link>
        </li>
      </ul>
      <ScaffoldingContext.Provider value={{ initialized }}>
        <Switch>
          <Route path="/app-one">
            <GenericRoute path="/app-one" />
          </Route>
          <Route path="/app-two">
            <GenericRoute path="/app-two" />
          </Route>
        </Switch>
      </ScaffoldingContext.Provider>
    </BrowserRouter>
  );
};

const wrapper = document.getElementById("root");
render(<Scaffolding />, wrapper);
