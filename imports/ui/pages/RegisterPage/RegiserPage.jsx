import React from 'react';

import RegisterContainer from '/imports/ui/containers/RegisterContainer/RegisterContainer';

import '/imports/ui/stylesheets/aligments.css';

const RegisterPage = () => (
  <div className="v-aligner">
    <div className="basic-from-wrapper">
      <h4 className="display-4 text-center">Register</h4>
      <RegisterContainer />
    </div>
  </div>
);

export default RegisterPage;
