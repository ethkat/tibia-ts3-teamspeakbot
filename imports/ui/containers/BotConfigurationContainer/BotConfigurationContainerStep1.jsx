import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Meteor } from 'meteor/meteor';
import { bindActionCreators } from 'redux';
import { createContainer } from 'meteor/react-meteor-data';
import TeamspeakChannelList from '/imports/ui/components/TeamspeakChannelList/TeamspeakChannelList';
import ResetTeamspeakMasterChannels from '/imports/ui/components/BotConfiguration/ResetTeamspeakMasterChannels';

import { Channels } from '/imports/api/bots/Channels';
import * as botConfigurationActions from '/imports/ui/actions/botConfiguration';

class BotConfigurationContainerStep1 extends React.Component {
  constructor(props) {
    super(props);

    this.onSelectChannel = this.onSelectChannel.bind(this);
    this.onDeleteMasterChannel = this.onDeleteMasterChannel.bind(this);
    this.onAcceptMasterChannel = this.onAcceptMasterChannel.bind(this);
    this.onCreateMasterChannels = this.onCreateMasterChannels.bind(this);
  }

  componentDidMount() {
    const { _id: botId, actions } = this.props;
    actions.getTeamspeakChannels({ botId });
  }

  onSelectChannel({ cid }) {
    const { actions } = this.props;
    actions.selectChannel({ selectedChannel: cid });
  }

  onCreateMasterChannels() {
    const { _id: botId, actions, selectedChannel } = this.props;
    actions.createMasterChannels({ botId, selectedChannel });
  }

  onDeleteMasterChannel() {
    const { _id: botId, actions } = this.props;
    actions.onDeleteMasterChannels({ botId });
  }

  onAcceptMasterChannel() {
    const { bot, actions } = this.props;
    actions.onUpdateBot({
      bot: {
        ...bot,
        configSetup: true,
      },
    });
  }

  render() {
    const { masterChannels, selectedChannel, teamspeakChannels } = this.props;

    return (
      <div>
        {
          !_.isEmpty(masterChannels) ?
            <div>
              <ResetTeamspeakMasterChannels
                onDelete={this.onDeleteMasterChannel}
                onAccept={this.onAcceptMasterChannel}
              />
            </div> :
            <TeamspeakChannelList
              selectChannel={this.onSelectChannel}
              selectedChannel={selectedChannel}
              teamspeakChannels={teamspeakChannels}
              createMasterChannels={this.onCreateMasterChannels}
            />
        }
      </div>
    );
  }
}

BotConfigurationContainerStep1.defaultProps = {
  bot: {},
  actions: {},
  masterChannels: {},
  selectedChannel: 0,
  teamspeakChannels: [],
};

BotConfigurationContainerStep1.propTypes = {
  _id: PropTypes.string.isRequired,
  bot: PropTypes.object,
  actions: PropTypes.object,
  masterChannels: PropTypes.object,
  selectedChannel: PropTypes.number,
  teamspeakChannels: PropTypes.array,
};

BotConfigurationContainerStep1 = createContainer(({ _id }) => {
  const handleChannels = Meteor.subscribe('channels.master.get', { _id });

  return {
    channelsReady: handleChannels.ready(),
    masterChannels: Channels.findOne({
      channelType: 'master',
    }),
  };
}, BotConfigurationContainerStep1);

const mapStateToProps = ({ botConfiguration }) => {
  const { selectedChannel, teamspeakChannels } = botConfiguration;
  return { selectedChannel, teamspeakChannels };
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(botConfigurationActions, dispatch),
});

BotConfigurationContainerStep1 = connect(
  mapStateToProps,
  mapDispatchToProps,
)(BotConfigurationContainerStep1);

export default BotConfigurationContainerStep1;
