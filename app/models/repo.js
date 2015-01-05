import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr(),
  full_name: DS.attr(),
  'private': DS.attr('boolean'),
  html_url: DS.attr(),
  description: DS.attr(),
  createdAt: DS.attr('date'),
  updatedAt: DS.attr('date'),
});
