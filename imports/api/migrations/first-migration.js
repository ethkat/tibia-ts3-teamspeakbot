import { ListItems } from '/imports/api/bots/ListItems';
import { Migrations } from 'meteor/percolate:migrations';

Migrations.add({
  version: 1,

  up() {
    ListItems.find().fetch().forEach(({ _id }) => (
      ListItems.update({ _id }, {
        $set: {
          pokeIfDied: 'false',
          pokeIfLvlUp: 'false',
          pokeIfOnline: 'false',
        },
      })
    ));
  },
});
