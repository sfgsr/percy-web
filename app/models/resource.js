import DS from 'ember-data';

export default DS.Model.extend({
  isRoot: DS.attr('boolean'),
  build: DS.belongsTo('build'),
  screenshots: DS.hasMany('screenshot', {async: true}),
  pageUrl: DS.attr(),
  resourceUrl: DS.attr(),
  mimetype: DS.attr(),
  sha: DS.attr(),
  createdAt: DS.attr('date'),
  updatedAt: DS.attr('date'),
});
