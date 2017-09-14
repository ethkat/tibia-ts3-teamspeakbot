import React from 'react';
import PropTypes from 'prop-types';

const PokePage = ({ params }) => {
  const { _id } = params;
  return (
    <div className="container">
      PokePage for id {_id}
    </div>
  );
};

PokePage.propTypes = {
  params: PropTypes.object.isRequired,
};

export default PokePage;
