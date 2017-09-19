import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as kickActions from '/imports/ui/actions/kick';
import Button from '/imports/ui/components/Forms/core/Button';

class KickContainer extends React.Component {
  constructor(props) {
    super(props);

    this.massKick = this.massKick.bind(this);
    this.onSelectChannelKickType = this.onSelectChannelKickType.bind(this);
  }

  componentDidMount() {}

  onSelectChannelKickType({ target }) {
    const { actions } = this.props;
    const { value: kickType } = target;
    actions.setKickType({ kickType });
  }

  massKick() {
    const { _id, actions } = this.props;
    actions.massKick({ _id });
  }

  render() {
    const { kickType } = this.props;
    return (
      <div>
        <div>
          <div className="text-center">
            <div className="form-check form-check-inline">
              <label className="form-check-label">
                <input
                  id="channelTypeKick1"
                  name="channelTypeKick"
                  type="radio"
                  value="all"
                  checked={kickType === 'all'}
                  className="form-check-input"
                  onChange={this.onSelectChannelKickType}
                />
                Mass Kick
              </label>
            </div>
            <div className="form-check form-check-inline">
              <label className="form-check-label">
                <input
                  id="channelTypeKick1"
                  name="channelTypeKick"
                  type="radio"
                  value="users"
                  checked={kickType === 'users'}
                  className="form-check-input"
                  onChange={this.onSelectChannelKickType}
                />
                Kick users
              </label>
            </div>
          </div>
          <div>
            {
              kickType === 'all' ?
                <div>
                  <Button
                    text="DO IT!"
                    onClick={this.massKick}
                  />
                </div>
                :
                <div>Hello Users</div>
            }
          </div>
        </div>
      </div>
    );
  }
}

KickContainer.defaultProps = {
  actions: {},
  teamspeakChannels: [],
};

KickContainer.propTypes = {
  _id: PropTypes.string.isRequired,
  actions: PropTypes.object,
  kickType: PropTypes.string.isRequired,
};

const mapStateToProps = ({ kick }) => {
  const { kickType } = kick;
  return { kickType };
};
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(kickActions, dispatch),
});

KickContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(KickContainer);

export default KickContainer;
