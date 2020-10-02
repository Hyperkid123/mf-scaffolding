import { initializeApp } from "core-functions";
import React, { Fragment, lazy, Suspense, useState } from "react";
import { Switch, BrowserRouter, Route, Link } from "react-router-dom";

const PageOne = lazy(() => import("./page-1"));
const PageTwo = lazy(() => import("./page-2"));

const url = new URL(document.currentScript.src);
__webpack_public_path__ = `${url.origin}/${__webpack_public_path__}`;

const AppTwo = () => {
  const [foo] = useState("foo");
  console.log("foo", foo);
  return (
    <div
      style={{
        backgroundColor: "palevioletred",
        color: "powderblue",
        padding: 8,
        margin: 0,
        minHeight: "100%",
      }}
    >
      <BrowserRouter basename="/app-one">
        <h1>App TWO</h1>
        <ul>
          <li>
            <Link to="/page-one">Page one app TWO</Link>
          </li>
          <li>
            <Link to="/page-two">Page two app TWO</Link>
          </li>
        </ul>
        <Suspense fallback={<Fragment></Fragment>}>
          <Switch>
            <Route path="/page-one">
              <PageOne />
            </Route>
            <Route path="/page-two">
              <PageTwo />
            </Route>
          </Switch>
        </Suspense>
      </BrowserRouter>
    </div>
  );
};

initializeApp(AppTwo, { id: "app-two-root", name: "appTwo" });
