import React from 'react';
import Modal from 'react-modal';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Meteor } from 'meteor/meteor';
import { bindActionCreators } from 'redux';
import { createContainer } from 'meteor/react-meteor-data';
import ChannelList from '/imports/ui/components/ChannelList/ChannelList';

import { Channels } from '/imports/api/bots/Channels';
import * as listActions from '/imports/ui/actions/lists';
import Button from '/imports/ui/components/Forms/core/Button';
import * as redirectActions from '/imports/ui/actions/redirect';
import NewListForm from '/imports/ui/components/Forms/NewListForm';

class ChannelListContainer extends React.Component {
  constructor(props) {
    super(props);

    this.onOpenModal = this.onOpenModal.bind(this);
    this.onDeleteList = this.onDeleteList.bind(this);
    this.onCloseModal = this.onCloseModal.bind(this);
    this.onCreateList = this.onCreateList.bind(this);
    this.onViewChannel = this.onViewChannel.bind(this);
  }

  onCreateList(list) {
    const { _id: botId, actions } = this.props;
    actions.createList({ list, botId }, () => this.onCloseModal());
  }

  onDeleteList({ _id }) {
    const { _id: botId, actions } = this.props;
    actions.deleteList({ _id, botId });
  }

  onOpenModal() {
    const { actions } = this.props;
    actions.openNewListModal();
  }

  onCloseModal() {
    const { actions } = this.props;
    actions.openNewListModal({ isModalOpen: false });
  }

  onViewChannel({ _id }) {
    const { actions } = this.props;
    actions.redirectTo({ to: `/dashboard/bot/list/${_id}` });
  }

  render() {
    const {
      channels,
      isModalOpen,
      channelsReady,
    } = this.props;
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
          {channelsReady ?
            <ChannelList
              channels={channels}
              deleteList={this.onDeleteList}
              viewList={this.onViewChannel}
            />
            :
            ''
          }
        </div>
      </div>
    );
  }
}

ChannelListContainer.defaultProps = {
  actions: {},
  channels: [],
  channelsReady: false,
  isModalOpen: false,
};

ChannelListContainer.propTypes = {
  _id: PropTypes.string.isRequired,
  actions: PropTypes.object,
  channels: PropTypes.array,
  isModalOpen: PropTypes.bool,
  channelsReady: PropTypes.bool,
};

ChannelListContainer = createContainer(({ _id }) => {
  const handleChannels = Meteor.subscribe('channels.get', { _id });

  return {
    channels: Channels.find().fetch(),
    channelsReady: handleChannels.ready(),
  };
}, ChannelListContainer);

const mapStateToProps = ({ lists }) => ({
  isModalOpen: lists.isModalOpen,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ ...redirectActions, ...listActions }, dispatch),
});

ChannelListContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ChannelListContainer);

export default ChannelListContainer;
