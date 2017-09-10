import React from 'react';
import Modal from 'react-modal';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Meteor } from 'meteor/meteor';
import { bindActionCreators } from 'redux';
import { createContainer } from 'meteor/react-meteor-data';

import { Bots } from '/imports/api/bots/Bots';
import * as botActions from '/imports/ui/actions/bots';
import BotsList from '/imports/ui/components/Bots/BotsList';
import NewBotForm from '/imports/ui/components/Forms/NewBotForm';

import Button from '/imports/ui/components/Forms/core/Button';

class BotsListContainer extends React.Component {
  constructor(props) {
    super(props);

    this.onOpenModal = this.onOpenModal.bind(this);
    this.onCloseModal = this.onCloseModal.bind(this);
    this.onSubmitNewBot = this.onSubmitNewBot.bind(this);
  }
  onSubmitNewBot(bot) {
    const { actions } = this.props;
    actions.insertNewBot({ bot }, () => this.onCloseModal());
  }

  onOpenModal() {
    const { actions } = this.props;
    actions.openNewBotModal();
  }

  onCloseModal() {
    const { actions } = this.props;
    actions.openNewBotModal({ isOpen: false });
  }

  render() {
    const { bots, isOpen } = this.props;
    return (
      <div className="container">
        <Modal
          isOpen={isOpen}
          onRequestClose={this.onCloseModal}
          contentLabel="Bot Data"
        >
          <h1>Bot Data</h1>
          <NewBotForm
            onSubmit={this.onSubmitNewBot}
          />
        </Modal>
        <div>
          <Button
            text="New Bot"
            onClick={this.onOpenModal}
          />
          <BotsList bots={bots} />
        </div>
      </div>
    );
  }
}

BotsListContainer.defaultProps = {
  bots: [],
  isOpen: false,
  actions: {},
};

BotsListContainer.propTypes = {
  bots: PropTypes.array,
  isOpen: PropTypes.bool,
  actions: PropTypes.object,
};

BotsListContainer = createContainer(() => {
  const botsHandle = Meteor.subscribe('bots.get');

  return {
    bots: Bots.find().fetch(),
    botsReady: botsHandle.ready(),
  };
}, BotsListContainer);

const mapStateToProps = ({ bots }) => {
  const { isOpen } = bots;
  return { isOpen };
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(botActions, dispatch),
});

BotsListContainer = connect(mapStateToProps, mapDispatchToProps)(BotsListContainer);

export default BotsListContainer;
