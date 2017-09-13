import { Mongo } from 'meteor/mongo';

class ListItemsCollection extends Mongo.Collection {
  insert(doc, callback) {
    super.insert({
      ...doc,
      createdAt: new Date(),
    }, callback);
  }

  remove(selector, callback) {
    super.remove(selector, callback);
  }
}

export const ListItems = new ListItemsCollection('ListItems');
