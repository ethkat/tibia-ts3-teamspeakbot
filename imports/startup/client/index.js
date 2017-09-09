import React from 'react';
import { render } from 'react-dom';
import { Meteor } from 'meteor/meteor';

import Routes from './routes';

Meteor.startup(() => {
  // eslint-disable-next-line no-undef
  render(<Routes />, document.getElementById('render-target'));
});
