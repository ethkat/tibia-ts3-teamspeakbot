import React from 'react';
import PropTypes from 'prop-types';

import BotListItem from '/imports/ui/components/Bots/BotListItem';

import '/imports/ui/components/Bots/style';

const BotsList = ({ bots, testBot, editBot, manageBot, deleteBot }) => (
  <div className="bots-list__parent">
    {bots.map(({ _id, name, error, world, server, createdAt, errorMessage }) => (
      <div className="row" key={_id}>
        <BotListItem
          _id={_id}
          error={error}
          name={name}
          world={world}
          server={server}
          editBot={editBot}
          testBot={testBot}
          createdAt={createdAt}
          manageBot={manageBot}
          deleteBot={deleteBot}
          errorMessage={errorMessage}
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
  testBot: PropTypes.func.isRequired,
  editBot: PropTypes.func.isRequired,
  manageBot: PropTypes.func.isRequired,
  deleteBot: PropTypes.func.isRequired,
};

export default BotsList;
