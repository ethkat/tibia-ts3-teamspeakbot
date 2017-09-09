import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as loginActions from '/imports/ui/actions/login';
import AccessForm from '/imports/ui/components/Forms/AccessForm';

import '/imports/ui/stylesheets/forms';

const FormRedirects = () => (
  <div className="two-hrefs-form-parent">
    <Link to="/register">Not registered?</Link>
    <Link to="/forgot-password">Forgot password?</Link>
  </div>
);

class LoginContainer extends React.Component {
  constructor(props) {
    super(props);

    this.onLogin = this.onLogin.bind(this);
  }

  onLogin({ email, password }) {
    const { actions } = this.props;
    actions.loginUser({ email, password });
  }

  render() {
    return (
      <div>
        <AccessForm
          Redirects={FormRedirects}
          onSubmit={this.onLogin}
        />
      </div>
    );
  }
}

LoginContainer.defaultProps = {
  actions: {},
};

LoginContainer.propTypes = {
  actions: PropTypes.object,
};

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(loginActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);
