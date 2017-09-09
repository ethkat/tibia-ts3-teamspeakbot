import React from 'react';
import store from '/imports/ui/store';
import { Provider } from 'react-redux';
import { createBrowserHistory } from 'history';
import { syncHistoryWithStore } from 'react-router-redux';
import { Router, Route, IndexRedirect, Redirect } from 'react-router';

import LoggedOutLayout from '/imports/ui/layouts/LoggedOutLayout';
import LandingPage from '/imports/ui/pages/landingPage/LandingPage';


const history = syncHistoryWithStore(createBrowserHistory(), store);

const Routes = () => (
  <Provider store={store}>
    <Router history={history}>
      <LoggedOutLayout>
        <Route path="/" component={LandingPage}/>
      </LoggedOutLayout>
    </Router>
  </Provider>
);

export default Routes;
