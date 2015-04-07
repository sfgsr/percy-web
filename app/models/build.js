import DS from 'ember-data';

export default DS.Model.extend({
  repo: DS.belongsTo('repo', {async: true}),
  commit: DS.belongsTo('commit'),
  baseBuild: DS.belongsTo('build'),
  comparisons: DS.hasMany('comparison'),
  resources: DS.hasMany('resource', {async: true}),
  state: DS.attr(),
  createdAt: DS.attr('date'),
  updatedAt: DS.attr('date'),
});
