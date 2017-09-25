import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';

import { buildValidation } from '/imports/ui/utils/forms';
import Button from '/imports/ui/components/Forms/core/Button';
import TextInput from '/imports/ui/components/Forms/core/TextInput';
import RadioField from '/imports/ui/components/Forms/core/RadioField';
import NewListItemFormSchema from '/imports/api/models/forms/NewListItemForm';

const yesOrNoOptions = [{
  id: 1,
  label: 'Yes, Poke',
  value: 'true',
}, {
  id: 2,
  label: 'No',
  value: 'false',
}];

let NewListItemForm = ({ handleSubmit }) => (
  <form onSubmit={handleSubmit} className="">
    <div className="form-group">
      <Field
        name="name"
        type="text"
        label="Enter char name or guild URL"
        placeholder=""
        component={TextInput}
      />
    </div>
    <div className="form-group">
      <Field
        name="pokeIfDied"
        label="Poke if Died"
        options={yesOrNoOptions}
        component={RadioField}
      />
    </div>
    <div className="form-group">
      <Field
        name="pokeIfOnline"
        label="Poke if Online"
        options={yesOrNoOptions}
        component={RadioField}
      />
    </div>
    <div className="form-group">
      <Field
        name="pokeIfLvlUp"
        label="Poke if Lvl Up"
        options={yesOrNoOptions}
        component={RadioField}
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
