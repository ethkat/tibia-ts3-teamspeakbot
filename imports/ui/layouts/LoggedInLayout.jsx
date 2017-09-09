import React from 'react';
import PropTypes from 'prop-types';

import LoggedInNav from '/imports/ui/components/core/LoggedInNav';

class LoggedInLayout extends React.Component {
  componentWillMount() {
    this.loginUser();
  }

  componentDidUpdate() {
    this.loginUser();
  }

  isLoggedIn() {
    const { loggedIn } = this.props;
    return loggedIn;
  }

  loginUser() {
    const { loggedIn } = this.props;
    return () => loggedIn;
  }

  render() {
    const { children } = this.props;
    return (
      <div>
        <LoggedInNav />
        {children}
      </div>
    );
  }
}

LoggedInLayout.defaultProps = {
  loggedIn: false,
};

LoggedInLayout.propTypes = {
  children: PropTypes.element.isRequired,
  loggedIn: PropTypes.bool,
};

export default LoggedInLayout;
