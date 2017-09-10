import React from 'react';
import store from '/imports/ui/store';
import { Provider } from 'react-redux';
import { syncHistoryWithStore } from 'react-router-redux';
import {
  Route,
  Router,
  IndexRedirect,
  browserHistory,
} from 'react-router';

import LoggedInLayout from '/imports/ui/layouts/LoggedInLayout';
import LoggedOutLayout from '/imports/ui/layouts/LoggedOutLayout';

import BotPage from '/imports/ui/pages/BotsPage/BotPage';
import BotsPage from '/imports/ui/pages/BotsPage/BotsPage';
import LoginPage from '/imports/ui/pages/LoginPage/LoginPage';
import LandingPage from '/imports/ui/pages/LandingPage/LandingPage';
import RegisterPage from '/imports/ui/pages/RegisterPage/RegiserPage';
import ForgotPassword from '/imports/ui/pages/ForgotPassword/ForgotPassword';

const history = syncHistoryWithStore(browserHistory, store);

export default () => (
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={LoggedOutLayout}>
        <IndexRedirect to="home" />
        <Route path="home" component={LandingPage} />
        <Route path="login" component={LoginPage} />
        <Route path="register" component={RegisterPage} />
        <Route path="forgot-password" component={ForgotPassword} />
      </Route>
      <Route path="/dashboard" component={LoggedInLayout}>
        <IndexRedirect to="bots" />
        <Route path="bots" component={BotsPage} />
        <Route path="bots/:_id" component={BotPage} />
      </Route>
    </Router>
  </Provider>
);
