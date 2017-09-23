import _ from 'lodash';
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
import * as redirectActions from '/imports/ui/actions/redirect';
import NewBotForm from '/imports/ui/components/Forms/NewBotForm';

import Button from '/imports/ui/components/Forms/core/Button';

class BotsListContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      edit: false,
      initialValues: {},
    };
    this.onTestBot = this.onTestBot.bind(this);
    this.onManageBot = this.onManageBot.bind(this);
    this.onDeleteBot = this.onDeleteBot.bind(this);
    this.onOpenModal = this.onOpenModal.bind(this);
    this.onCloseModal = this.onCloseModal.bind(this);
    this.onEditBotInfo = this.onEditBotInfo.bind(this);
    this.onSubmitNewBot = this.onSubmitNewBot.bind(this);
    this.onNewButtonClick = this.onNewButtonClick.bind(this);
  }
  onSubmitNewBot(bot) {
    const { edit } = this.state;
    const { actions } = this.props;
    if (edit) {
      actions.editBot({ bot }, () => this.onCloseModal());
    } else {
      actions.insertNewBot({ bot }, () => this.onCloseModal());
    }
  }

  onNewButtonClick() {
    this.setState({
      edit: false,
    });
    this.onOpenModal();
  }

  onOpenModal() {
    const { actions } = this.props;
    actions.openNewBotModal();
  }

  onCloseModal() {
    const { actions } = this.props;
    this.setState({
      initialValues: {},
      edit: false,
    });
    actions.openNewBotModal({ isOpen: false });
  }

  onEditBotInfo({ botId }) {
    const { bots } = this.props;
    const bot = _.find(bots, { _id: botId });
    this.setState({
      edit: true,
      initialValues: bot,
    });
    this.onOpenModal();
  }

  onManageBot({ botId }) {
    const { actions } = this.props;
    actions.redirectTo({ to: `/dashboard/bots/${botId}` });
  }

  onDeleteBot({ botId }) {
    const { actions } = this.props;
    actions.deleteBot({ botId }, () => {});
  }

  onTestBot({ botId }) {
    const { actions } = this.props;
    actions.testBot({ botId }, () => {});
  }

  render() {
    const { bots, isOpen } = this.props;
    const { edit, initialValues } = this.state;

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
            initialValues={initialValues}
            isEditMode={edit}
          />
        </Modal>
        <div>
          <Button
            text="New Bot"
            onClick={this.onNewButtonClick}
          />
          <BotsList
            bots={bots}
            testBot={this.onTestBot}
            editBot={this.onEditBotInfo}
            deleteBot={this.onDeleteBot}
            manageBot={this.onManageBot}
          />
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
  actions: bindActionCreators({ ...redirectActions, ...botActions }, dispatch),
});

BotsListContainer = connect(mapStateToProps, mapDispatchToProps)(BotsListContainer);

export default BotsListContainer;
