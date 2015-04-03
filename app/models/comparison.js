import DS from 'ember-data';

export default DS.Model.extend({
  build: DS.belongsTo('build'),
  baseResource: DS.belongsTo('resource', {async: true}),
  headResource: DS.belongsTo('resource', {async: true}),
  pdiff: DS.belongsTo('pdiff', {async: true}),
  state: DS.attr(),
  createdAt: DS.attr('date'),
  updatedAt: DS.attr('date'),
});
