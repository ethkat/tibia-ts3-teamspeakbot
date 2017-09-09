import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as userActions from '/imports/ui/actions/user';

class LoggedOutNav extends React.Component {
  constructor(props) {
    super(props);

    this.onLogout = this.onLogout.bind(this);
  }

  onLogout() {
    const { actions } = this.props;
    actions.logoutUser();
  }

  render() {
    return (
      <ul className="nav justify-content-end">
        <li className="nav-item">
          <Link
            to="/login"
            className="nav-link"
          >
            Login
          </Link>
        </li>
        <li className="nav-item">
          <Link
            to="/register"
            className="nav-link"
          >
            Register
          </Link>
        </li>
      </ul>
    );
  }
}

LoggedOutNav.defaultProps = {
  actions: {},
};

LoggedOutNav.propTypes = {
  actions: PropTypes.object,
};

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(userActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoggedOutNav);
