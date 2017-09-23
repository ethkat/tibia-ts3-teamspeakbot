import React from 'react';
import PropTypes from 'prop-types';

const getButtonClass = ({ klass, theme }) => `btn  ${klass} ${theme}`;

const Button = ({
  type,
  text,
  klass,
  theme,
  onClick,
  disabled,
}) => (
  <button
    style={{ cursor: 'pointer' }}
    type={type}
    disabled={disabled}
    onClick={onClick}
    className={getButtonClass({ klass, theme })}
  >
    {text}
  </button>
);

Button.defaultProps = {
  type: 'button',
  text: 'Click',
  klass: '',
  theme: 'btn-primary',
  onClick: () => {},
  disabled: '',
};

Button.propTypes = {
  type: PropTypes.string,
  text: PropTypes.string,
  klass: PropTypes.string,
  theme: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.string,
};

export default Button;
