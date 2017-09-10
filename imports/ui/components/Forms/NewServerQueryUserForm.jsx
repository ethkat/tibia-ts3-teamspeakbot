import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';

import { buildValidation } from '/imports/ui/utils/forms';
import Button from '/imports/ui/components/Forms/core/Button';
import NewServerQueryUserFormSchema from '/imports/api/models/forms/NewServerQueryUserForm';
import TextInput from '/imports/ui/components/Forms/core/TextInput';

import '/imports/ui/stylesheets/buttons';

let NewServerQueryUserForm = ({ handleSubmit }) => (
  <form onSubmit={handleSubmit} className="">
    <div className="form-group">
      <Field
        name="username"
        type="text"
        label="username"
        placeholder="username"
        component={TextInput}
      />
    </div>
    <div className="form-group">
      <Field
        name="password"
        type="password"
        label="password"
        placeholder="password"
        component={TextInput}
      />
    </div>
    <div className="form-group">
      <Button
        type="submit"
        text="Create"
        klass="full-button"
      />
    </div>
  </form>
);

NewServerQueryUserForm.defaultProps = {
  handleSubmit: () => {},
};

NewServerQueryUserForm.propTypes = {
  handleSubmit: PropTypes.func,
};

NewServerQueryUserForm = reduxForm({
  form: 'NewServerQueryUserForm',
  validate: buildValidation({
    validator: NewServerQueryUserFormSchema,
  }),
})(NewServerQueryUserForm);

export default NewServerQueryUserForm;
