import React from 'react';
import PropTypes from 'prop-types';

const DragPage = ({ params }) => {
  const { _id } = params;
  return (
    <div className="container">
      DragPage for id {_id}
    </div>
  );
};

DragPage.propTypes = {
  params: PropTypes.object.isRequired,
};

export default DragPage;
