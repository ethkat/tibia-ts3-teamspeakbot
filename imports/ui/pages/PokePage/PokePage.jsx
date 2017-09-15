import React from 'react';
import PropTypes from 'prop-types';

import SendPokeContainer from '/imports/ui/containers/Poke/SendPokeContainer';

const PokePage = ({ params }) => {
  const { _id } = params;
  return (
    <div className="container">
      <h4 className="display-4 text-center">Send MASS POKE</h4>
      <SendPokeContainer _id={_id} />
    </div>
  );
};

PokePage.propTypes = {
  params: PropTypes.object.isRequired,
};

export default PokePage;
