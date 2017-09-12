import React from 'react';
import PropTypes from 'prop-types';

import Button from '/imports/ui/components/Forms/core/Button';

const ChannelListItem = ({
  _id,
  deleteList,
  channelName,
}) => (
  <div className="col-sm-12">
    <div className="list-group-item">
      <div className="d-flex w-100 justify-content-between">
        <h5 className="mb-1">{channelName}</h5>
        <Button
          text="Delete"
          theme="btn-danger"
          onClick={() => {
            deleteList({ _id });
          }}
        />
      </div>
    </div>
  </div>
);

ChannelListItem.propTypes = {
  _id: PropTypes.string.isRequired,
  deleteList: PropTypes.func.isRequired,
  channelName: PropTypes.string.isRequired,
};

export default ChannelListItem;
