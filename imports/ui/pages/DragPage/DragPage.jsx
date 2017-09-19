import React from 'react';
import PropTypes from 'prop-types';

import DragContainer from '/imports/ui/containers/DragContainer/DragContainer';

const DragPage = ({ params }) => {
  const { _id } = params;
  return (
    <div className="container">
      <p className="display-4 text-center">Select a Channel</p>
      <DragContainer _id={_id} />
    </div>
  );
};

DragPage.propTypes = {
  params: PropTypes.object.isRequired,
};

export default DragPage;
