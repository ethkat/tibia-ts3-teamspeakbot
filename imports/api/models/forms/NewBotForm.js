import SimpleSchema from 'simpl-schema';

export default new SimpleSchema({
  port: Number,
  name: String,
  world: String,
  server: String,
  address: String,
  serverId: String,
});
