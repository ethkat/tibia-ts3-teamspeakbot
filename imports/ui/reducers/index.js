import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import { routerReducer as routing } from 'react-router-redux';

import bots from '/imports/ui/reducers/bots';

export default combineReducers({
  form,
  bots,
  routing,
});
