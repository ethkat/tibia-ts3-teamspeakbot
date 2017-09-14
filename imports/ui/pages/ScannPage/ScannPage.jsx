import React from 'react';
import PropTypes from 'prop-types';

const ScannPage = ({ params }) => {
  const { _id } = params;
  return (
    <div className="container">
      ScannPage for id {_id}
    </div>
  );
};

ScannPage.propTypes = {
  params: PropTypes.object.isRequired,
};

export default ScannPage;
