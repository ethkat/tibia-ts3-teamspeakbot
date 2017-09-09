import React from 'react';
import PropTypes from 'prop-types';

const Input = ({ name, type, input, placeholder }) => (
  <input
    name={name}
    type={type}
    placeholder={placeholder}
    {...input}
    className="form-control"
  />
);

Input.defaultProps = {
  name: 'bot-input',
  type: 'text',
  input: {},
  placeholder: '',
};

Input.propTypes = {
  name: PropTypes.string,
  type: PropTypes.string,
  input: PropTypes.object,
  placeholder: PropTypes.string,
};

export default Input;
