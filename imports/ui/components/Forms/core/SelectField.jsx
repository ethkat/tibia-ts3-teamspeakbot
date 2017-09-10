import React from 'react';
import PropTypes from 'prop-types';

const SelectField = ({
  meta,
  name,
  input,
  label,
  options,
}) => {
  const { touched, error } = meta;

  return (
    <div>
      <label className="" htmlFor={name}>{label}</label>
      <select name={name} {...input} className="custom-select">
        {options.map(({ key, value }) => (
          <option
            key={key}
            value={value}
          >
            {value}
          </option>
        ))}
      </select>
      {
        touched && error ?
          <p className="form-text text-muted">{error}</p> : ''
      }
    </div>
  );
};

SelectField.defaultProps = {
  meta: {},
  name: 'select',
  input: {},
  label: 'select label',
};

SelectField.propTypes = {
  meta: PropTypes.object,
  name: PropTypes.string,
  input: PropTypes.object,
  label: PropTypes.string,
  options: PropTypes.array.isRequired,
};

export default SelectField;
