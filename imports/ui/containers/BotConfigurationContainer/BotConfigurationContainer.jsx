import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';

import { Bots } from '/imports/api/bots/Bots';
import { createContainer } from 'meteor/react-meteor-data';

let BotConfigurationContainer = ({ bot }) => (
  <div>{bot.name}</div>
);

BotConfigurationContainer.defaultProps = {
  bot: {},
};

/* eslint-disable react/no-unused-prop-types */
BotConfigurationContainer.propTypes = {
  _id: PropTypes.string.isRequired,
  bot: PropTypes.object,
};

BotConfigurationContainer = createContainer(({ _id }) => {
  const botsHandle = Meteor.subscribe('bot.get', { _id });

  return {
    bot: Bots.findOne({ _id }),
    botReady: botsHandle.ready(),
  };
}, BotConfigurationContainer);

export default BotConfigurationContainer;
