import React from 'react';
import PropTypes from 'prop-types';

import ItemListItem from '/imports/ui/components/ItemList/ItemListItem';

import '/imports/ui/components/ItemList/style';

const ItemList = ({ listItems, deleteItem }) => (
  <div className="list-group channel-list">
    {listItems.map(({ _id, name }) => (
      <div className="row" key={_id}>
        <ItemListItem
          _id={_id}
          deleteItem={deleteItem}
          name={name}
        />
      </div>
    ))}
  </div>
);


ItemList.propTypes = {
  listItems: PropTypes.array.isRequired,
  deleteItem: PropTypes.func.isRequired,
};

export default ItemList;
