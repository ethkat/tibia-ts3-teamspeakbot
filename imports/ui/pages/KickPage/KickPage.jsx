import React from 'react';
import PropTypes from 'prop-types';

import KickContainer from '/imports/ui/containers/Kick/KickContainer';

const KickPage = ({ params }) => {
  const { _id } = params;
  return (
    <div className="container">
      <KickContainer _id={_id} />
    </div>
  );
};

KickPage.propTypes = {
  params: PropTypes.object.isRequired,
};

export default KickPage;
