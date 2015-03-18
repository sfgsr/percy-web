import DS from 'ember-data';

export default DS.Model.extend({
  repo: DS.belongsTo('repo', {async: true}),
  state: DS.attr(),
  version: DS.attr(),
  createdAt: DS.attr('date'),
  updatedAt: DS.attr('date'),
});
