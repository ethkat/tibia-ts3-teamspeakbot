import React from 'react';
import PropTypes from 'prop-types';

import KickContainer from '/imports/ui/containers/KickContainer/KickContainer';

const KickPage = ({ params }) => {
  const { _id } = params;

  return (
    <div className="container">
      <p className="display-4 text-center">Select Kick Type</p>
      <br />
      <br />
      <KickContainer _id={_id} />
    </div>
  );
};

KickPage.propTypes = {
  params: PropTypes.object.isRequired,
};

export default KickPage;
