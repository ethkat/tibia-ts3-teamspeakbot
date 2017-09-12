import React from 'react';
import PropTypes from 'prop-types';

import ListContainer from '/imports/ui/containers/ListContainer/ListContainer';

const ListPage = ({ params }) => {
  const { _id } = params;
  return (
    <div className="container">
      <ListContainer
        _id={_id}
      />
    </div>
  );
};

ListPage.propTypes = {
  params: PropTypes.object.isRequired,
};

export default ListPage;
