import React from 'react';
import PropTypes from 'prop-types';

import Input from '/imports/ui/components/Forms/core/Input';

const RadioField = ({
  meta,
  label,
  input,
  options,
}) => {
  const { name } = input;
  const { touched, error } = meta;

  return (
    <div>
      <label className="" htmlFor={name}>{label}</label>
      {options.map(({ id, label: optionLabel, value }) => (
        <div className="form-check" key={id || value}>
          <label className="form-check-label">
            <Input
              name={name}
              input={input}
              className="form-check-input"
              type="radio"
              value={value}
            />
            {optionLabel}
          </label>
        </div>
      ))}
      {
        touched && error ?
          <p className="form-text text-muted">{error}</p> : ''
      }
    </div>
  );
};

RadioField.defaultProps = {};

RadioField.propTypes = {
  meta: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
  input: PropTypes.object.isRequired,
  options: PropTypes.array.isRequired,
};

export default RadioField;
