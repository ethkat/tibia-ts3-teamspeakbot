import React from 'react';
import PropTypes from 'prop-types';

import Button from '/imports/ui/components/Forms/core/Button';

const ChannelListItem = ({
  _id,
  viewList,
  deleteList,
  channelName,
}) => (
  <div className="col-sm-12">
    <div className="list-group-item">
      <div className="row">
        <div className="col-sm-6">
          <h5 className="mb-1">{channelName}</h5>
        </div>
        <div className="col-sm-6 list-actions">
          <Button
            text="View"
            theme="btn-primary"
            onClick={() => {
              viewList({ _id });
            }}
          />
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
  </div>
);

ChannelListItem.propTypes = {
  _id: PropTypes.string.isRequired,
  viewList: PropTypes.func.isRequired,
  deleteList: PropTypes.func.isRequired,
  channelName: PropTypes.string.isRequired,
};

export default ChannelListItem;
