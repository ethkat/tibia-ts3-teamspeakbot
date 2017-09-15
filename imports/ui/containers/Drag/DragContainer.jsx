import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as dragActions from '/imports/ui/actions/drag';
import Button from '/imports/ui/components/Forms/core/Button';
import * as botConfigurationActions from '/imports/ui/actions/botConfiguration';
import TeamspeakChannelList from '/imports/ui/components/TeamspeakChannelList/TeamspeakChannelList';

class DragContainer extends React.Component {
  constructor(props) {
    super(props);

    this.onDrag = this.onDrag.bind(this);
    this.massKick = this.massKick.bind(this);
    this.onSelectChannel = this.onSelectChannel.bind(this);
  }

  componentDidMount() {
    const { _id: botId, actions } = this.props;
    actions.getTeamspeakChannels({ botId });
  }

  onDrag() {
    const { _id, actions, selectedChannel } = this.props;
    actions.dragAll({ _id, cid: selectedChannel });
  }

  onSelectChannel({ cid, channelName }) {
    const { actions } = this.props;
    actions.selectChannel({ selectedChannelName: channelName, selectedChannel: cid });
  }

  massKick() {
    const { _id, actions, selectedChannel } = this.props;
    actions.dragAll({ _id, cid: selectedChannel });
  }

  render() {
    const { selectedChannel, selectedChannelName, teamspeakChannels } = this.props;
    return (
      <div>
        <div>
          {
            selectedChannel ?
              <Button
                text={`Mass Kick from channel: ${selectedChannelName}`}
                onClick={this.massKick}
              /> : ''
          }
        </div>
        <TeamspeakChannelList
          selectChannel={this.onSelectChannel}
          selectedChannel={selectedChannel}
          teamspeakChannels={teamspeakChannels}
          createMasterChannels={this.onDrag}
        />
      </div>
    );
  }
}

DragContainer.defaultProps = {
  actions: {},
  selectedChannel: 0,
  teamspeakChannels: [],
  selectedChannelName: '',
};

DragContainer.propTypes = {
  _id: PropTypes.string.isRequired,
  actions: PropTypes.object,
  selectedChannel: PropTypes.number,
  teamspeakChannels: PropTypes.array,
  selectedChannelName: PropTypes.string,
};

const mapStateToProps = ({ botConfiguration }) => {
  const { selectedChannel, teamspeakChannels } = botConfiguration;
  return { selectedChannel, teamspeakChannels };
};
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    ...dragActions,
    ...botConfigurationActions,
  }, dispatch),
});

DragContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(DragContainer);

export default DragContainer;
