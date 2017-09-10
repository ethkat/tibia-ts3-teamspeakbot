import React from 'react';
import PropTypes from 'prop-types';

import BotListItem from '/imports/ui/components/Bots/BotListItem';

import '/imports/ui/components/Bots/style';

const BotsList = ({ bots }) => (
  <div className="bots-list__parent">
    {bots.map(({ _id, name, world, server, createdAt }) => (
      <div className="row" key={_id}>
        <BotListItem
          _id={_id}
          name={name}
          world={world}
          server={server}
          createdAt={createdAt}
        />
      </div>
    ))}
  </div>
);

BotsList.defaultProps = {
  bots: [],
};

BotsList.propTypes = {
  bots: PropTypes.array,
};

export default BotsList;
