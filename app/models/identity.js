import DS from 'ember-data';

export default DS.Model.extend({
  user: DS.belongsTo('user'),
  provider: DS.attr('string'),
  uid: DS.attr('string'),
  nickname: DS.attr('string'),
});
