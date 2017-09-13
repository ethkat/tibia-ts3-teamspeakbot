import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';

import { buildValidation } from '/imports/ui/utils/forms';
import Button from '/imports/ui/components/Forms/core/Button';
import NewListItemFormSchema from '/imports/api/models/forms/NewListItemForm';
import TextInput from '/imports/ui/components/Forms/core/TextInput';


let NewListItemForm = ({ handleSubmit }) => (
  <form onSubmit={handleSubmit} className="">
    <div className="form-group">
      <Field
        name="field"
        type="text"
        label="Enter char name or guild URL"
        placeholder=""
        component={TextInput}
      />
    </div>
    <div className="form-group">
      <Button
        type="submit"
        text="Add Item"
        klass="full-button"
      />
    </div>
  </form>
);

NewListItemForm.defaultProps = {
  handleSubmit: () => {},
};

NewListItemForm.propTypes = {
  handleSubmit: PropTypes.func,
};

NewListItemForm = reduxForm({
  form: 'NewListItemForm',
  validate: buildValidation({
    validator: NewListItemFormSchema,
  }),
})(NewListItemForm);

export default NewListItemForm;
