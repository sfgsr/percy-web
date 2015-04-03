import DS from 'ember-data';

export default DS.Model.extend({
  build: DS.belongsTo('build'),
  baseResource: DS.belongsTo('resource'),
  headResource: DS.belongsTo('resource'),
  pdiff: DS.belongsTo('pdiff', {async: true}),
  state: DS.attr(),
  createdAt: DS.attr('date'),
  updatedAt: DS.attr('date'),
});
