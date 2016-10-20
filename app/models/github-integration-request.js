import DS from 'ember-data';

export default DS.Model.extend({
  state: DS.attr(),
  createdBy: DS.belongsTo('user', {async: false}),
  createdAt: DS.attr('date'),
  updatedAt: DS.attr('date'),
});
