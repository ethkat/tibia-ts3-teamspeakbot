import React from 'react';
import Modal from 'react-modal';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Meteor } from 'meteor/meteor';
import { bindActionCreators } from 'redux';
import { createContainer } from 'meteor/react-meteor-data';

import { Channels } from '/imports/api/bots/Channels';
import * as listActions from '/imports/ui/actions/lists';
import Button from '/imports/ui/components/Forms/core/Button';

class ListContainer extends React.Component {
  constructor(props) {
    super(props);
    this.onOpenModal = this.onOpenModal.bind(this);
    this.onCloseModal = this.onCloseModal.bind(this);
  }

  onOpenModal() {
    const { actions } = this.props;
    actions.openNewItemModal();
  }

  onCloseModal() {
    const { actions } = this.props;
    actions.openNewItemModal({ isItemModalOpen: false });
  }

  render() {
    const {
      channel,
      channelReady,
      isItemModalOpen,
    } = this.props;
    return (
      <div>
        {channelReady ?
          <h2>List: {channel.channelName}</h2>
          :
          ''
        }
        <Button
          text="Add item"
          onClick={this.onOpenModal}
        />
        <Modal
          isOpen={isItemModalOpen}
          onRequestClose={this.onCloseModal}
          contentLabel="New Item"
        >
          <h1>New Item</h1>
        </Modal>
      </div>
    );
  }
}

ListContainer.defaultProps = {
  actions: {},
  channel: {},
  channelReady: false,
  isItemModalOpen: false,
};

ListContainer.propTypes = {
  _id: PropTypes.string.isRequired,
  actions: PropTypes.object,
  channel: PropTypes.object,
  channelReady: PropTypes.bool,
  isItemModalOpen: PropTypes.bool,
};

ListContainer = createContainer(({ _id }) => {
  const handleChannel = Meteor.subscribe('channel.get', { _id });

  return {
    channel: Channels.findOne({}),
    channelReady: handleChannel.ready(),
  };
}, ListContainer);

const mapStateToProps = ({ lists }) => ({
  isItemModalOpen: lists.isItemModalOpen,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(listActions, dispatch),
});

ListContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ListContainer);

export default ListContainer;
