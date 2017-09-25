import React from 'react';
import PropTypes from 'prop-types';

const Input = ({ name, type, input, value, className, placeholder }) => (
  <input
    name={name}
    type={type}
    placeholder={placeholder}
    {...input}
    className={className || 'form-control'}
    onChange={(e) => {
      if (type === 'radio') {
        // since HTML will scape to string
        input.onChange(value);
      } else {
        input.onChange(e.target.value);
      }
    }}
  />
);

Input.defaultProps = {
  name: 'bot-input',
  type: 'text',
  input: {},
  value: '',
  className: '',
  placeholder: '',
};

Input.propTypes = {
  name: PropTypes.string,
  type: PropTypes.string,
  input: PropTypes.object,
  value: PropTypes.string,
  className: PropTypes.string,
  placeholder: PropTypes.string,
};

export default Input;
