import React from 'react';
import Modal from 'react-modal';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as listActions from '/imports/ui/actions/lists';
import Button from '/imports/ui/components/Forms/core/Button';
import NewListForm from '/imports/ui/components/Forms/NewListForm';

class BotConfigurationContainerStep2 extends React.Component {
  constructor(props) {
    super(props);

    this.onOpenModal = this.onOpenModal.bind(this);
    this.onCloseModal = this.onCloseModal.bind(this);
    this.onCreateList = this.onCreateList.bind(this);
  }

  onCreateList(list) {
    const { _id: botId, actions } = this.props;
    actions.createList({ list, botId }, () => this.onCloseModal());
  }

  onOpenModal() {
    const { actions } = this.props;
    actions.openNewListModal();
  }

  onCloseModal() {
    const { actions } = this.props;
    actions.openNewListModal({ isModalOpen: false });
  }

  render() {
    const { isModalOpen } = this.props;
    return (
      <div>
        <div>
          <Modal
            isOpen={isModalOpen}
            onRequestClose={this.onCloseModal}
            contentLabel="List Data"
          >
            <h1>List Data</h1>
            <NewListForm
              onSubmit={this.onCreateList}
            />
          </Modal>
          <Button
            text="Create List"
            onClick={this.onOpenModal}
          />
        </div>
      </div>
    );
  }
}

BotConfigurationContainerStep2.defaultProps = {
  actions: {},
  isModalOpen: false,
};

BotConfigurationContainerStep2.propTypes = {
  _id: PropTypes.string.isRequired,
  actions: PropTypes.object,
  isModalOpen: PropTypes.bool,
};

const mapStateToProps = ({ lists }) => ({
  isModalOpen: lists.isModalOpen,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(listActions, dispatch),
});

BotConfigurationContainerStep2 = connect(
  mapStateToProps,
  mapDispatchToProps,
)(BotConfigurationContainerStep2);

export default BotConfigurationContainerStep2;
