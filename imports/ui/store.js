import { createLogger } from 'redux-logger';
import { browserHistory } from 'react-router';
import { routerMiddleware } from 'react-router-redux';
import { createStore, applyMiddleware, compose } from 'redux';

import appReducer from '/imports/ui/reducers/index';

const routerActions = routerMiddleware(browserHistory);
const logger = createLogger({
  stateTransformer: (state) => {
    const printableState = {};

    _.each(_.keys(state), (key) => {
      printableState[key] = (state[key].toJS && state[key].toJS()) || state[key];
    });

    return printableState;
  },
  collapsed: true,
});

export default createStore(appReducer, compose(
    applyMiddleware(logger, routerActions)),
);
