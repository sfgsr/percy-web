import DS from 'ember-data';

export default DS.Model.extend({
  user: DS.belongsTo('user'),
  provider: DS.attr(),
  uid: DS.attr(),
  nickname: DS.attr(),
});
