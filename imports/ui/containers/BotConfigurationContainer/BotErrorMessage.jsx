import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

const BotErrorMessage = ({ errorMessage }) => (
  <div>
    <div className="alert alert-danger" role="alert">
      Error: {errorMessage}
    </div>
    <Link to="/dashboard/bots">Go to bots page</Link>
  </div>
);

BotErrorMessage.defaultProps = {
  errorMessage: '',
};

BotErrorMessage.propTypes = {
  errorMessage: PropTypes.string,
};

export default BotErrorMessage;
