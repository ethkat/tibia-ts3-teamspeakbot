import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import { routerReducer as routing } from 'react-router-redux';

import bots from '/imports/ui/reducers/bots';
import serverQueryUsers from '/imports/ui/reducers/serverQueryUsers';

export default combineReducers({
  form,
  bots,
  routing,
  serverQueryUsers,
});
