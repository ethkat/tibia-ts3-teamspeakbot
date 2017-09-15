import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as pokeActions from '/imports/ui/actions/poke';
import SendPokeForm from '/imports/ui/components/Forms/SendPokeForm';

class SendPokeContainer extends React.Component {
  constructor(props) {
    super(props);
    this.sendPoke = this.sendPoke.bind(this);
  }

  sendPoke({ message }) {
    const { _id, actions } = this.props;
    actions.sendPoke({ _id, message });
  }

  render() {
    return (
      <div>
        <SendPokeForm
          onSubmit={this.sendPoke}
        />
      </div>
    );
  }
}

SendPokeContainer.defaultProps = {
  actions: {},
};

SendPokeContainer.propTypes = {
  _id: PropTypes.string.isRequired,
  actions: PropTypes.object,
};

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(pokeActions, dispatch),
});

SendPokeContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SendPokeContainer);

export default SendPokeContainer;
