import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Meteor } from 'meteor/meteor';
import { bindActionCreators } from 'redux';
import { createContainer } from 'meteor/react-meteor-data';

import Footer from '/imports/ui/components/core/Footer';
import * as redirectActions from '/imports/ui/actions/redirect';
import LoggedInNav from '/imports/ui/components/core/LoggedInNav';
import WhiteList from '/imports/ui/components/Notifications/WhiteList';

class LoggedInLayout extends React.Component {
  componentWillMount() {
    this.redirectLogout();
  }

  componentDidUpdate() {
    this.redirectLogout();
  }

  redirectLogout() {
    const { actions, loggedIn, loggingIn } = this.props;
    const loggedOut = !loggingIn && !loggedIn;
    if (loggedOut) {
      actions.redirectTo({ to: '/home' });
    }
  }

  render() {
    const { children } = this.props;
    return (
      <div>
        <LoggedInNav />
        <div className="main-container">
          <WhiteList />
          {children}
        </div>
        <Footer position="fixed" />
      </div>
    );
  }
}

LoggedInLayout.defaultProps = {
  actions: {},
  loggedIn: false,
  loggingIn: false,
};

LoggedInLayout.propTypes = {
  actions: PropTypes.object,
  children: PropTypes.element.isRequired,
  loggedIn: PropTypes.bool,
  loggingIn: PropTypes.bool,
};

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(redirectActions, dispatch),
});

LoggedInLayout = createContainer(() => ({
  loggedIn: !!Meteor.userId(),
  loggingIn: Meteor.loggingIn(),
}), LoggedInLayout);

LoggedInLayout = connect(mapStateToProps, mapDispatchToProps)(LoggedInLayout);

export default LoggedInLayout;
