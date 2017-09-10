import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form';

import { buildValidation } from '/imports/ui/utils/forms';
import Button from '/imports/ui/components/Forms/core/Button';
import TextInput from '/imports/ui/components/Forms/core/TextInput';

import NewBotFormSchema from '/imports/api/models/forms/NewBotForm';

import '/imports/ui/stylesheets/buttons';

const NewBotForm = ({ handleSubmit }) => (
  <form onSubmit={handleSubmit} className="">
    <div className="form-group">
      <Field
        name="name"
        type="text"
        label="Bot name"
        placeholder="Bot name"
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

NewBotForm.defaultProps = {
  handleSubmit: () => {},
};

NewBotForm.propTypes = {
  handleSubmit: PropTypes.func,
};

export default reduxForm({
  form: 'NewBotForm',
  validate: buildValidation({
    validator: NewBotFormSchema,
  }),
})(NewBotForm);
