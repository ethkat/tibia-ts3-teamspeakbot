import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import { Bots } from '/imports/api/bots/Bots';
import BotFeaturesPage from '/imports/ui/pages/BotsPage/BotFeaturesPage';
import BotErrorMessage from '/imports/ui/containers/BotConfigurationContainer/BotErrorMessage';
import BotConfigurationContainerStep1 from '/imports/ui/containers/BotConfigurationContainer/BotConfigurationContainerStep1';

const calculateStepByData = ({ configSetup }) => {
  let step = 2;

  if (!configSetup) step = 1;
  return step;
};

const containersByStep = {
  1: BotConfigurationContainerStep1,
  2: BotFeaturesPage,
};

let BotConfigurationContainer = ({ bot, botReady }) => {
  const { _id, error, errorMessage, configSetup } = bot;
  const step = calculateStepByData({ configSetup });
  const ContainerStep = containersByStep[step];

  return (
    <div>
      {
        botReady ?
          <div>
            {
              error ?
                <BotErrorMessage errorMessage={errorMessage} /> : ''
            }
            <ContainerStep _id={_id} bot={bot} />
          </div> : ''
      }
    </div>
  );
};

BotConfigurationContainer.defaultProps = {
  bot: {},
  botReady: false,
};

/* eslint-disable react/no-unused-prop-types */
BotConfigurationContainer.propTypes = {
  _id: PropTypes.string.isRequired,
  bot: PropTypes.object,
  botReady: PropTypes.bool,
};

BotConfigurationContainer = createContainer(({ _id }) => {
  const botsHandle = Meteor.subscribe('bot.get', { _id });

  return {
    bot: Bots.findOne({ _id }),
    botReady: botsHandle.ready(),
  };
}, BotConfigurationContainer);

export default BotConfigurationContainer;
