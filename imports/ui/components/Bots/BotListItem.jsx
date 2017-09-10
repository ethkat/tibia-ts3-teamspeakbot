import React from 'react';
import PropTypes from 'prop-types';

const BotsListItem = ({ name }) => (
  <div className="col-sm-12">
    <div className="list-group">
      <a href="/" className="list-group-item list-group-item-action flex-column align-items-start">
        <div className="d-flex w-100 justify-content-between">
          <h5 className="mb-1">{name}</h5>
          <small>{name}</small>
        </div>
        <p className="mb-1">{name}</p>
        <small>{name}</small>
      </a>
    </div>
  </div>
);

BotsListItem.defaultProps = {
  name: '',
};

BotsListItem.propTypes = {
  name: PropTypes.string,
};

export default BotsListItem;
