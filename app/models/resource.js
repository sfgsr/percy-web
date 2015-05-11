import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr(),
  build: DS.belongsTo('build'),
  isRoot: DS.attr('boolean'),
  screenshots: DS.hasMany('screenshot'),
  pageUrl: DS.attr(),
  resourceUrl: DS.attr(),
  mimetype: DS.attr(),
  sha: DS.attr(),
  createdAt: DS.attr('date'),
  updatedAt: DS.attr('date'),
});
