import React from 'react';
import PropTypes from 'prop-types';

const StatsPage = ({ params }) => {
  const { _id } = params;
  return (
    <div className="container">
      ScannPage for id {_id}
    </div>
  );
};

StatsPage.propTypes = {
  params: PropTypes.object.isRequired,
};

export default StatsPage;
