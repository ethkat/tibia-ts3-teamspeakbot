import React from 'react';
import PropTypes from 'prop-types';

import ChannelListContainer from '/imports/ui/containers/ChannelListContainer/ChannelListContainer';

const ListsPage = ({ params }) => {
  const { _id } = params;
  return (
    <div className="container">
      <ChannelListContainer _id={_id} />
    </div>
  );
};

ListsPage.propTypes = {
  params: PropTypes.object.isRequired,
};

export default ListsPage;
