import React, { useEffect, useState, useContext } from "react";
import PropTypes from "prop-types";
import { render, unmountComponentAtNode } from "react-dom";
import { useRouteMatch } from "react-router-dom";
import { getAppsByPathname, getApp } from "core-functions";
import ScaffoldingContext from "./scaffolding-context";

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
          console.log("name", name);
          const app = getApp(name) || {};
          console.log({ app });
          if (appPathname && pathname !== appPathname) {
            const node = document.getElementById(id);
            if (node) {
              unmountComponentAtNode(document.getElementById(id));
            }
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
          const node = document.getElementById(id);
          if (node) {
            unmountComponentAtNode(document.getElementById(id));
          }
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
  return <div id={id} style={{ height: "100%" }}></div>;
};

GenericRoute.propTypes = {
  path: PropTypes.string.isRequired,
};

export default GenericRoute;
