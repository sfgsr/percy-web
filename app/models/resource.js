import DS from 'ember-data';

export default DS.Model.extend({
  build: DS.belongsTo('build'),
  basePageUrl: DS.attr(),
  originalUrl: DS.attr(),
  mimetype: DS.attr(),
  md5Hash: DS.attr(),
  createdAt: DS.attr('date'),
  updatedAt: DS.attr('date'),
});
