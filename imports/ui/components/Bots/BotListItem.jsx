import React from 'react';
import PropTypes from 'prop-types';
import Button from '/imports/ui/components/Forms/core/Button';

import { formatDate } from '/imports/helpers/date';

const getBadge = ({ error, errorMessage }) => (
  `<span class="badge badge-${error ? 'danger' : 'success'}">${error ? `Config Error: ${errorMessage}` : 'OK'}</span>`
);

const BotsListItem = ({
  _id: botId,
  name,
  world,
  error,
  server,
  testBot,
  editBot,
  manageBot,
  deleteBot,
  createdAt: date,
  errorMessage,
}) => (
  <div className="col-sm-12">
    <div className="list-group-item">
      <div className="row">
        <div className="col-sm-6">
          <div className="d-flex w-100 justify-content-between flex-column align-items-start">
            <h5 className="mb-1">{name}</h5>
            <small>Server: {server} - {world}</small>
            <small>
              Status: <span dangerouslySetInnerHTML={{ __html: getBadge({ error, errorMessage }) }} />
            </small>
          </div>
          <p className="mb-1">Created at: {formatDate({ date })}</p>
        </div>
        <div className="col-sm-6 list-actions">
          <Button
            text="Edit"
            theme="btn-primary"
            onClick={() => {
              editBot({ botId });
            }}
          />
          {
            error ?
              <Button
                text="Test Confi"
                theme="btn-primary"
                onClick={() => {
                  testBot({ botId });
                }}
              /> :
              <Button
                text="Manage"
                theme="btn-success"
                onClick={() => {
                  manageBot({ botId });
                }}
              />
          }
          <Button
            text="Delete"
            theme="btn-danger"
            onClick={() => {
              deleteBot({ botId });
            }}
          />
        </div>
      </div>
    </div>
  </div>
);

BotsListItem.defaultProps = {
  error: false,
  errorMessage: '',
};

BotsListItem.propTypes = {
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  error: PropTypes.bool,
  world: PropTypes.string.isRequired,
  server: PropTypes.string.isRequired,
  testBot: PropTypes.func.isRequired,
  editBot: PropTypes.func.isRequired,
  manageBot: PropTypes.func.isRequired,
  deleteBot: PropTypes.func.isRequired,
  createdAt: PropTypes.object.isRequired,
  errorMessage: PropTypes.string,
};

export default BotsListItem;
