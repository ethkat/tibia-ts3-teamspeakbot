import React from 'react';
import PropTypes from 'prop-types';

import BotConfigurationContainer from '/imports/ui/containers/BotConfigurationContainer/BotConfigurationContainer';

const BotPage = ({ params }) => {
  const { _id } = params;
  return (
    <div>
      <BotConfigurationContainer
        _id={_id}
      />
    </div>
  );
};

BotPage.propTypes = {
  params: PropTypes.object.isRequired,
};

export default BotPage;
