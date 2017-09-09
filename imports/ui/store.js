import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { browserHistory } from 'react-router';
import { routerMiddleware } from 'react-router-redux';
import { createStore, applyMiddleware, compose } from 'redux';

import appReducer from '/imports/ui/reducers/index';

const routerActions = routerMiddleware(browserHistory);
const logger = createLogger({
  collapsed: true,
});

export default createStore(appReducer, compose(
  applyMiddleware(
    thunk,
    logger,
    routerActions,
  )),
);
