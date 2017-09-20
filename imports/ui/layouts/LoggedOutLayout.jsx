import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Meteor } from 'meteor/meteor';
import { bindActionCreators } from 'redux';
import { createContainer } from 'meteor/react-meteor-data';

import Footer from '/imports/ui/components/core/Footer';
import * as redirectActions from '/imports/ui/actions/redirect';
import GithubRibbon from '/imports/ui/components/core/GithubRibbon';
import LoggedOutNav from '/imports/ui/components/core/LoggedOutNav';

class LoggedOutLayout extends React.Component {
  componentWillMount() {
    this.loginUser();
  }

  componentDidUpdate() {
    this.loginUser();
  }

  loginUser() {
    const { actions, loggedIn } = this.props;
    if (loggedIn) {
      actions.redirectTo({ to: '/dashboard' });
    }
  }


  render() {
    const { children } = this.props;
    return (
      <div>
        <GithubRibbon />
        <LoggedOutNav />
        {children}
        <Footer />
      </div>
    );
  }
}

LoggedOutLayout.defaultProps = {
  actions: {},
  loggedIn: false,
};

LoggedOutLayout.propTypes = {
  actions: PropTypes.object,
  children: PropTypes.element.isRequired,
  loggedIn: PropTypes.bool,
};

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(redirectActions, dispatch),
});

LoggedOutLayout = createContainer(() => ({
  loggedIn: !!Meteor.userId(),
}), LoggedOutLayout);

LoggedOutLayout = connect(mapStateToProps, mapDispatchToProps)(LoggedOutLayout);

export default LoggedOutLayout;
