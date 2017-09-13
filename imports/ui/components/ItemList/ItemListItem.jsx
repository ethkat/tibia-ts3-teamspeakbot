import React from 'react';
import PropTypes from 'prop-types';

import Button from '/imports/ui/components/Forms/core/Button';

const ItemListItem = ({
  _id,
  name,
  deleteItem,
}) => (
  <div className="col-sm-12">
    <div className="list-group-item">
      <div className="row">
        <div className="col-sm-6">
          {name}
        </div>
        <div className="col-sm-6 list-actions">
          <Button
            text="Remove"
            theme="btn-danger"
            onClick={() => {
              deleteItem({ _id });
            }}
          />
        </div>
      </div>
    </div>
  </div>
);

ItemListItem.propTypes = {
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  deleteItem: PropTypes.func.isRequired,
};

export default ItemListItem;
