import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';

import { buildValidation } from '/imports/ui/utils/forms';
import Button from '/imports/ui/components/Forms/core/Button';
import TextInput from '/imports/ui/components/Forms/core/TextInput';
import SendPokeFormSchema from '/imports/api/models/forms/SendPokeForm';

let SendPokeForm = ({ handleSubmit }) => (
  <form onSubmit={handleSubmit} className="">
    <div className="form-group">
      <Field
        name="message"
        type="text"
        label="Message"
        placeholder="Poke Message"
        component={TextInput}
      />
    </div>
    <div className="form-group">
      <Button
        type="submit"
        text="Send Mass POKE"
        klass="full-button"
      />
    </div>
  </form>
);

SendPokeForm.defaultProps = {
  handleSubmit: () => {},
};

SendPokeForm.propTypes = {
  handleSubmit: PropTypes.func,
};

SendPokeForm = reduxForm({
  form: 'SendPokeForm',
  validate: buildValidation({
    validator: SendPokeFormSchema,
  }),
})(SendPokeForm);

export default SendPokeForm;
