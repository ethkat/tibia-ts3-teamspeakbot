import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Button from '/imports/ui/components/Forms/core/Button';

import * as userActions from '/imports/ui/actions/user';

class LoggedInNav extends React.Component {
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
      <div className="header">
        <ul className="nav nav-pills pull-right" style={{ marginRight: '1em' }}>
          <li className="nav-item">
            <Link
              to="/login"
              className="nav-link"
            >
              Dashboard
            </Link>
          </li>
          <li className="nav-item">
            <Button
              text="Logout"
              type="button"
              klass="nav-link"
              onClick={this.onLogout}
            />
          </li>
        </ul>
      </div>
    );
  }
}

LoggedInNav.defaultProps = {
  actions: {},
};

LoggedInNav.propTypes = {
  actions: PropTypes.object,
};

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(userActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoggedInNav);
