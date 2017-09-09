import React from 'react';
import PropTypes from 'prop-types';
import Input from '/imports/ui/components/Forms/core/Input';

const TextInput = ({
  type,
  meta,
  name,
  input,
  label,
  ...extra
}) => {
  const { placeholder } = extra;
  const { touched, error } = meta;

  return (
    <div>
      <label className="" htmlFor={name}>{label}</label>
      <Input
        input={input}
        name={name}
        type={type}
        placeholder={placeholder}
      />
      {
        touched && error ?
          <p className="form-text text-muted">{error}</p> : ''
      }
    </div>
  );
};

TextInput.defaultProps = {
  type: 'text',
  meta: {},
  name: 'input',
  input: {},
  label: 'input label',
};

TextInput.propTypes = {
  type: PropTypes.string,
  meta: PropTypes.object,
  name: PropTypes.string,
  input: PropTypes.object,
  label: PropTypes.string,
};

export default TextInput;
