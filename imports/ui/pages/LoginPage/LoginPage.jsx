import React from 'react';

import LoginContainer from '/imports/ui/containers/LoginContainer/LoginContainer';

import '/imports/ui/stylesheets/forms';

const LoginPage = () => (
  <div className="v-aligner">
    <div className="basic-from-wrapper">
      <h4 className="display-4 text-center">Login</h4>
      <LoginContainer />
    </div>
  </div>
);

export default LoginPage;
