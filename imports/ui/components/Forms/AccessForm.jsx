import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form';

import { buildValidation } from '/imports/ui/utils/forms';
import Button from '/imports/ui/components/Forms/core/Button';
import TextInput from '/imports/ui/components/Forms/core/TextInput';

import AccessFormSchema from '/imports/api/models/forms/AccessForm';

import '/imports/ui/stylesheets/buttons';

const AccessForm = ({ Redirects, handleSubmit }) => (
  <form onSubmit={handleSubmit} className="">
    <div className="form-group">
      <Field
        name="email"
        type="text"
        label="Email or Username"
        placeholder="Email or Username"
        component={TextInput}
      />
    </div>
    <div className="form-group">
      <Field
        name="password"
        type="password"
        label="Password"
        placeholder="Password"
        component={TextInput}
      />
    </div>
    <div className="form-group">
      <Button
        type="submit"
        text="Submit"
        klass="full-button"
      />
    </div>
    <div className="form-group">
      <Redirects />
    </div>
  </form>
);

AccessForm.defaultProps = {
  Redirects: () => (<div />),
  handleSubmit: () => {},
};

AccessForm.propTypes = {
  Redirects: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func,
};

export default reduxForm({
  form: 'AccessForm',
  validate: buildValidation({
    validator: AccessFormSchema,
  }),
})(AccessForm);
