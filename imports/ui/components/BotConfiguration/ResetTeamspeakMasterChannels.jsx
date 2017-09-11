import React from 'react';
import PropTypes from 'prop-types';

import Button from '/imports/ui/components/Forms/core/Button';

const ResetTeamspeakMasterChannels = ({ onDelete, onAccept }) => (
  <div>
    <h5 className="display-4 text-center">Confirmation Step</h5>
    <br />
    <div className="text-center">
      <div>
        <Button
          text="Yes, the bot work great"
          onClick={onAccept}
        />
      </div> <br />
      <div>
        <Button
          text="Nou, let me try again"
          onClick={onDelete}
        />
      </div>
    </div>
  </div>
);

ResetTeamspeakMasterChannels.propTypes = {
  onDelete: PropTypes.func.isRequired,
  onAccept: PropTypes.func.isRequired,
};

export default ResetTeamspeakMasterChannels;
