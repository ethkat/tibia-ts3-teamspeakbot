import React from 'react';
import PropTypes from 'prop-types';

import ChannelListItem from '/imports/ui/components/ChannelList/ChannelListItem';

import '/imports/ui/components/ChannelList/style';

const ChannelList = ({ channels, deleteList }) => (
  <div className="list-group channel-list">
    {channels.map(({ _id, channelName }) => (
      <div className="row" key={_id}>
        <ChannelListItem
          _id={_id}
          deleteList={deleteList}
          channelName={channelName}
        />
      </div>
    ))}
  </div>
);


ChannelList.propTypes = {
  channels: PropTypes.array.isRequired,
  deleteList: PropTypes.func.isRequired,
};

export default ChannelList;
