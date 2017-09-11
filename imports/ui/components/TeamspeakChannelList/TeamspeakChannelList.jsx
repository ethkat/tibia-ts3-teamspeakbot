import React from 'react';
import PropTypes from 'prop-types';

import TeamspeakChannelListItem from '/imports/ui/components/TeamspeakChannelList/TeamspeakChannelListItem';

const TeamspeakChannelList = ({
  selectChannel,
  selectedChannel,
  teamspeakChannels,
  createMasterChannels,
}) => (
  <div className="list-group">
    {teamspeakChannels.map(({ cid, channel_name: channelName }) => (
      <div className="row" key={cid}>
        <TeamspeakChannelListItem
          cid={cid}
          channelName={channelName}
          selectChannel={selectChannel}
          selectedChannel={selectedChannel}
          createMasterChannels={createMasterChannels}
        />
      </div>
    ))}
  </div>
);

TeamspeakChannelList.defaultProps = {
  selectedChannel: 0,
};

TeamspeakChannelList.propTypes = {
  selectChannel: PropTypes.func.isRequired,
  selectedChannel: PropTypes.number.isRequired,
  teamspeakChannels: PropTypes.array.isRequired,
  createMasterChannels: PropTypes.func.isRequired,
};

export default TeamspeakChannelList;
