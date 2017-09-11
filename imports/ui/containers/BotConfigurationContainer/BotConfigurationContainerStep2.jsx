import React from 'react';
import PropTypes from 'prop-types';

class BotConfigurationContainerStep2 extends React.Component {
  fo() {
    const { foo } = this.props;
    return foo;
  }

  render() {
    return (
      <div>
        <h1>Hello</h1>
      </div>
    );
  }
}

BotConfigurationContainerStep2.defaultProps = {
  foo: '',
};

BotConfigurationContainerStep2.propTypes = {
  foo: PropTypes.string,
};

export default BotConfigurationContainerStep2;
