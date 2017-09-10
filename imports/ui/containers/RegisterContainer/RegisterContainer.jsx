import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as registerActions from '/imports/ui/actions/register';
import AccessForm from '/imports/ui/components/Forms/AccessForm';

const FormRedirects = () => (
  <div>
    <Link to="/login">Already registered?</Link>
  </div>
);

class RegisterContainer extends React.Component {
  constructor(props) {
    super(props);

    this.onRegister = this.onRegister.bind(this);
  }

  onRegister({ email, password }) {
    const { actions } = this.props;
    actions.registerUser({ email, password });
  }

  render() {
    return (
      <div>
        <AccessForm
          Redirects={FormRedirects}
          onSubmit={this.onRegister}
        />
      </div>
    );
  }
}

RegisterContainer.defaultProps = {
  actions: {},
};

RegisterContainer.propTypes = {
  actions: PropTypes.object,
};

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(registerActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(RegisterContainer);
