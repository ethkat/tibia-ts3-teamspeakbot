import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import { Bots } from '/imports/api/bots/Bots';
import { ServerQueryUsers } from '/imports/api/bots/ServerQueryUsers';
import BotFeaturesPage from '/imports/ui/pages/BotsPage/BotFeaturesPage';
import BotConfigurationContainerStep0 from '/imports/ui/containers/BotConfigurationContainer/BotConfigurationContainerStep0';
import BotConfigurationContainerStep1 from '/imports/ui/containers/BotConfigurationContainer/BotConfigurationContainerStep1';

const calculateStepByData = ({ queryUser, configSetup }) => {
  let step = 2;

  if (_.isEmpty(queryUser)) step = 0;
  else if (!configSetup) step = 1;
  return step;
};

const containersByStep = {
  0: BotConfigurationContainerStep0,
  1: BotConfigurationContainerStep1,
  2: BotFeaturesPage,
};

let BotConfigurationContainer = ({ bot, botReady, queryUser }) => {
  const { _id, configSetup } = bot;
  const step = calculateStepByData({ queryUser, configSetup });
  const ContainerStep = containersByStep[step];

  return (
    <div>
      {
        botReady ?
          <ContainerStep _id={_id} bot={bot} /> :
          ''
      }
    </div>
  );
};

BotConfigurationContainer.defaultProps = {
  bot: {},
  botReady: false,
  queryUser: {},
};

/* eslint-disable react/no-unused-prop-types */
BotConfigurationContainer.propTypes = {
  _id: PropTypes.string.isRequired,
  bot: PropTypes.object,
  botReady: PropTypes.bool,
  queryUser: PropTypes.object,
};

BotConfigurationContainer = createContainer(({ _id }) => {
  const botsHandle = Meteor.subscribe('bot.get', { _id });
  const queryUserHandle = Meteor.subscribe('queryUser.get', { botId: _id });

  return {
    bot: Bots.findOne({ _id }),
    botReady: botsHandle.ready(),
    queryUser: ServerQueryUsers.findOne({ botId: _id }),
    queryUserReady: queryUserHandle.ready(),
  };
}, BotConfigurationContainer);

export default BotConfigurationContainer;
