import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector } from 'redux-form';

import { buildValidation } from '/imports/ui/utils/forms';
import Button from '/imports/ui/components/Forms/core/Button';
import { normalizeNumber } from '/imports/ui/utils/form-helpers';
import TextInput from '/imports/ui/components/Forms/core/TextInput';
import { SERVERS, WORLDS_BY_SERVER } from '/imports/utils/constants';
import SelectField from '/imports/ui/components/Forms/core/SelectField';

import NewBotFormSchema from '/imports/api/models/forms/NewBotForm';

import '/imports/ui/stylesheets/buttons';

const serverSelectOptions = SERVERS.map(server => ({
  key: server,
  value: server,
}));

const getWorldServer = (option) => {
  const worlds = WORLDS_BY_SERVER[option];
  return worlds.map(world => ({
    key: world,
    value: world,
  }));
};

let NewBotForm = ({ server, handleSubmit }) => (
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
      <Field
        name="address"
        type="text"
        label="TS3 Address"
        placeholder="TS3 Address"
        component={TextInput}
      />
    </div>
    <div className="form-group">
      <Field
        name="port"
        type="number"
        label="TS3 Address PORT"
        normalize={normalizeNumber}
        placeholder="TS3 Address PORT"
        component={TextInput}
      />
    </div>
    <div className="form-group">
      <Field
        name="server"
        type="text"
        label="Server"
        options={serverSelectOptions}
        placeholder="Server"
        component={SelectField}
      />
    </div>
    {
      server ?
        <div className="form-group">
          <Field
            name="world"
            type="text"
            label="World"
            options={getWorldServer(server)}
            placeholder="World"
            component={SelectField}
          />
        </div> : null
    }
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
  server: 'tibiaRL',
  handleSubmit: () => {},
};

NewBotForm.propTypes = {
  server: PropTypes.string,
  handleSubmit: PropTypes.func,
};

const form = 'NewBotForm';
NewBotForm = reduxForm({
  form,
  validate: buildValidation({
    validator: NewBotFormSchema,
  }),
})(NewBotForm);

const selector = formValueSelector(form);

NewBotForm = connect((state) => {
  const server = selector(state, 'server');
  return { server };
})(NewBotForm);

export default NewBotForm;
