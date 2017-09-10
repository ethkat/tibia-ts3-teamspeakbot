import React from 'react';
import Modal from 'react-modal';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as serverQueryUsersActions from '/imports/ui/actions/serverQueryUsers';

import Button from '/imports/ui/components/Forms/core/Button';
import NewServerQueryUserForm from '/imports/ui/components/Forms/NewServerQueryUserForm';

class BotConfigurationContainerStep1 extends React.Component {
  constructor(props) {
    super(props);

    this.onOpenModal = this.onOpenModal.bind(this);
    this.onCloseModal = this.onCloseModal.bind(this);
    this.onSubmitServerQueryUser = this.onSubmitServerQueryUser.bind(this);
  }

  onOpenModal() {
    const { actions } = this.props;
    actions.openNewServerQueryUserModal();
  }

  onCloseModal() {
    const { actions } = this.props;
    actions.openNewServerQueryUserModal({ isOpen: false });
  }

  onSubmitServerQueryUser(user) {
    const { _id: botId, actions } = this.props;
    actions.insertServerQueryUser({
      user: { ...user, botId },
    }, () => this.onCloseModal());
  }

  render() {
    const { isOpen } = this.props;

    return (
      <div>
        <Modal
          isOpen={isOpen}
          onRequestClose={this.onCloseModal}
          contentLabel="Bot Data"
        >
          <h1>ServerQuery User Data</h1>
          <NewServerQueryUserForm
            onSubmit={this.onSubmitServerQueryUser}
          />
        </Modal>
        <div className="alert alert-warning" role="alert">
          Seems like you dont put yet any kind of ServerQuery User
        </div>
        <div>
          <Button
            text="Add User"
            onClick={this.onOpenModal}
          />
        </div>
      </div>
    );
  }
}

BotConfigurationContainerStep1.defaultProps = {
  isOpen: false,
  actions: {},
};

BotConfigurationContainerStep1.propTypes = {
  _id: PropTypes.string.isRequired,
  isOpen: PropTypes.bool,
  actions: PropTypes.object,
};

const mapStateToProps = ({ serverQueryUsers }) => {
  const { isOpen } = serverQueryUsers;
  return { isOpen };
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(serverQueryUsersActions, dispatch),
});

BotConfigurationContainerStep1 = connect(
  mapStateToProps,
  mapDispatchToProps,
)(BotConfigurationContainerStep1);

export default BotConfigurationContainerStep1;
