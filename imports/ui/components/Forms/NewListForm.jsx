import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';

import { buildValidation } from '/imports/ui/utils/forms';
import Button from '/imports/ui/components/Forms/core/Button';
import NewListFormSchema from '/imports/api/models/forms/NewListForm';
import TextInput from '/imports/ui/components/Forms/core/TextInput';

import '/imports/ui/stylesheets/buttons';

let NewListForm = ({ handleSubmit }) => (
  <form onSubmit={handleSubmit} className="">
    <div className="form-group">
      <Field
        name="name"
        type="text"
        label="List name"
        placeholder="List name"
        component={TextInput}
      />
    </div>
    <div className="form-group">
      <Button
        type="submit"
        text="Create List"
        klass="full-button"
      />
    </div>
  </form>
);

NewListForm.defaultProps = {
  handleSubmit: () => {},
};

NewListForm.propTypes = {
  handleSubmit: PropTypes.func,
};

NewListForm = reduxForm({
  form: 'NewListForm',
  validate: buildValidation({
    validator: NewListFormSchema,
  }),
})(NewListForm);

export default NewListForm;
