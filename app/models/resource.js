import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr(),
  snapshot: DS.belongsTo('snapshot'),
  isRoot: DS.attr('boolean'),
  resourceUrl: DS.attr(),
  mimetype: DS.attr(),
  uploadedAt: DS.attr('date'),
  createdAt: DS.attr('date'),
  updatedAt: DS.attr('date'),
});
