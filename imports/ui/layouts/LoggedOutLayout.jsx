import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';

class LoggedOutLayout extends React.Component {

  render() {
    const { children } = this.props;
    return (
      <div>
        {children}
      </div>
    );
  }
}

LoggedOutLayout.propTypes = {};

export default LoggedOutLayout;
