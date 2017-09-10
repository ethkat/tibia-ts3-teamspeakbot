import { Mongo } from 'meteor/mongo';

class ServerQueryUsersCollection extends Mongo.Collection {
  insert(doc, callback) {
    super.insert({
      ...doc,
      createdAt: new Date(),
    }, callback);
  }
}

export const ServerQueryUsers = new ServerQueryUsersCollection('ServerQueryUsers');
