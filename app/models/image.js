import DS from 'ember-data';

export default DS.Model.extend({
  sha: DS.attr(),
  mimetype: DS.attr(),
  url: DS.attr(),
  width: DS.attr('number'),
  height: DS.attr('number'),
  createdAt: DS.attr('date'),
  updatedAt: DS.attr('date'),
});
