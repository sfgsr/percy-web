import DS from 'ember-data';

export default DS.Model.extend({
  url: DS.attr(),
  md5_hash: DS.attr(),
  mimetype: DS.attr(),
  size: DS.attr(),
  created_at: DS.attr(),
  updated_at: DS.attr(),
});
