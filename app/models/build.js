import DS from 'ember-data';

export default DS.Model.extend({
  repo: DS.belongsTo('repo', {async: true}),
  commit: DS.belongsTo('commit'),
  targetCommit: DS.belongsTo('commit'),
  comparisons: DS.hasMany('comparison', {async: true}),
  resources: DS.hasMany('resource', {async: true}),
  state: DS.attr(),
  createdAt: DS.attr('date'),
  updatedAt: DS.attr('date'),
});
