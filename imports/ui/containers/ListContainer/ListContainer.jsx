import React from 'react';
import Modal from 'react-modal';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Meteor } from 'meteor/meteor';
import { bindActionCreators } from 'redux';
import { Bots } from '/imports/api/bots/Bots';
import { isUrl } from '/imports/ui/helpers/strings';
import { Channels } from '/imports/api/bots/Channels';
import { ListItems } from '/imports/api/bots/ListItems';
import * as listActions from '/imports/ui/actions/lists';
import { createContainer } from 'meteor/react-meteor-data';

import Button from '/imports/ui/components/Forms/core/Button';
import ItemList from '/imports/ui/components/ItemList/ItemList';
import NewListItemForm from '/imports/ui/components/Forms/NewListItemForm';


class ListContainer extends React.Component {
  constructor(props) {
    super(props);
    this.onOpenModal = this.onOpenModal.bind(this);
    this.onCloseModal = this.onCloseModal.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.onCreateListItem = this.onCreateListItem.bind(this);
  }

  onOpenModal() {
    const { actions } = this.props;
    actions.openNewItemModal();
  }

  onCloseModal() {
    const { actions } = this.props;
    actions.openNewItemModal({ isItemModalOpen: false });
  }

  onCreateListItem({ field: name }) {
    const { _id: listId, bot, actions } = this.props;
    const { world, server } = bot;

    if (isUrl(name)) {
      actions.createItemFromUrl({
        name,
        world,
        server,
        listId,
      }, () => this.onCloseModal());
    } else {
      actions.createItem({ listId, name }, () => this.onCloseModal());
    }
  }

  deleteItem({ _id }) {
    const { actions } = this.props;
    actions.deleteItem({ _id });
  }

  render() {
    const {
      channel,
      listItems,
      channelReady,
      isItemModalOpen,
    } = this.props;
    return (
      <div>
        {channelReady ?
          <div>
            <h2>List: {channel.channelName}</h2>
            <Button
              text="Add item"
              onClick={this.onOpenModal}
            />
            <ItemList
              listItems={listItems}
              deleteItem={this.deleteItem}
            />
          </div>
          :
          ''
        }
        <Modal
          isOpen={isItemModalOpen}
          onRequestClose={this.onCloseModal}
          contentLabel="New Item"
        >
          <NewListItemForm
            onSubmit={this.onCreateListItem}
          />
        </Modal>
      </div>
    );
  }
}

ListContainer.defaultProps = {
  bot: {},
  actions: {},
  channel: {},
  listItems: [],
  channelReady: false,
  isItemModalOpen: false,
};

ListContainer.propTypes = {
  _id: PropTypes.string.isRequired,
  bot: PropTypes.object,
  actions: PropTypes.object,
  channel: PropTypes.object,
  listItems: PropTypes.array,
  channelReady: PropTypes.bool,
  isItemModalOpen: PropTypes.bool,
};

ListContainer = createContainer(({ _id }) => {
  const handleChannel = Meteor.subscribe('channel.get', { _id });
  const handleBotFromList = Meteor.subscribe('bot.from.list.get', { _id });
  Meteor.subscribe('listItems.get', { listId: _id });
  return {
    bot: Bots.findOne(),
    channel: Channels.findOne({}),
    listItems: ListItems.find().fetch(),
    botReady: handleBotFromList.ready(),
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
