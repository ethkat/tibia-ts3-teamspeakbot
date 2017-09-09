import React from 'react';
import { render } from 'react-dom';
import { Meteor } from 'meteor/meteor';

import Routes from '/imports/startup/client/Routes.jsx';

Meteor.startup(() => {
  render(<Routes />, document.getElementById('render-target'));
});
