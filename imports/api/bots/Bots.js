import { Mongo } from 'meteor/mongo';

class BotsCollection extends Mongo.Collection {
  insert(doc, callback) {
    super.insert({
      ...doc,
      createdAt: new Date(),
    }, callback);
  }
}

export const Bots = new BotsCollection('Bots');
