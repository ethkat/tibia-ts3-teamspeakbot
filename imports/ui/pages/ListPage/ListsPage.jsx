import React from 'react';
import PropTypes from 'prop-types';

const ListsPage = ({ params }) => {
  const { _id } = params;
  return (
    <div className="container">
      List Pages for id {_id}
    </div>
  );
};

ListsPage.propTypes = {
  params: PropTypes.object.isRequired,
};

export default ListsPage;
