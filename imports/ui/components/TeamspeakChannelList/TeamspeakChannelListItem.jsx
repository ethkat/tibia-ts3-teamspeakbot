import React from 'react';
import PropTypes from 'prop-types';

import Button from '/imports/ui/components/Forms/core/Button';

import '/imports/ui/components/TeamspeakChannelList/style';

const TeamspeakChannelListItem = ({
  cid,
  channelName,
  selectChannel,
  selectedChannel,
  createMasterChannels,
}) => (
  <div className="col-sm-12">
    <a onClick={() => selectChannel({ cid })} role="button" tabIndex={0}>
      <div className="list-group-item list-group-item__hover">
        <div className="d-flex w-100 justify-content-between">
          <h5 className="mb-1">{channelName}</h5>
          {
            selectedChannel === cid ?
              <Button
                text="Select this?"
                onClick={createMasterChannels}
              /> : ''
          }
        </div>
      </div>
    </a>
  </div>
);

TeamspeakChannelListItem.defaultProps = {
  cid: 0,
  channelName: '',
};

TeamspeakChannelListItem.propTypes = {
  cid: PropTypes.number.isRequired,
  channelName: PropTypes.string.isRequired,
  selectChannel: PropTypes.func.isRequired,
  selectedChannel: PropTypes.number.isRequired,
  createMasterChannels: PropTypes.func.isRequired,
};

export default TeamspeakChannelListItem;
