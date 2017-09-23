import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import { routerReducer as routing } from 'react-router-redux';

import kick from '/imports/ui/reducers/kick';
import bots from '/imports/ui/reducers/bots';
import lists from '/imports/ui/reducers/lists';
import botConfiguration from '/imports/ui/reducers/botConfiguration';


export default combineReducers({
  kick,
  form,
  bots,
  lists,
  routing,
  botConfiguration,
});
