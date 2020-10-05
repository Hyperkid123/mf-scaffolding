import React from 'react';
import { initializeApp } from 'core-functions';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './utilities/store';
import App from './App';

const url = new URL(document.currentScript.src);
// eslint-disable-next-line no-undef
__webpack_public_path__ = `${url.origin}/${__webpack_public_path__}`;

const Root = () => (
  <Provider store={store}>
    <Router basename="/rbac">
      <App />
    </Router>
  </Provider>
);

initializeApp(Root, { id: 'rbac-root', name: 'rbac' });
