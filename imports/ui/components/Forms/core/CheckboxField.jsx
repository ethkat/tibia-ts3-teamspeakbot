import React from 'react';
import PropTypes from 'prop-types';

import Input from '/imports/ui/components/Forms/core/Input';

const CheckBoxField = ({
  name,
  meta,
  input,
  options,
}) => {
  const { touched, error } = meta;
  return (
    <div>
      {options.map(({ id, label, value }) => (
        <div className="form-check" key={id || value}>
          <label className="form-check-label">
            <Input
              name={name}
              input={input}
              className="form-check-input"
              type="checkbox"
              value={value}
            />
            {label}
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

CheckBoxField.defaultProps = {};

CheckBoxField.propTypes = {
  name: PropTypes.string.isRequired,
  meta: PropTypes.object.isRequired,
  input: PropTypes.object.isRequired,
  options: PropTypes.array.isRequired,
};

export default CheckBoxField;
