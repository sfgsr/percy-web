import Ember from 'ember';
import DS from 'ember-data';

export default DS.Model.extend({
  organization: DS.belongsTo('organization', {async: false}),
  name: DS.attr(),
  slug: DS.attr(),
  isEnabled: DS.attr('boolean'),
  isDisabled: Ember.computed.not('isEnabled'),
  diffBase: DS.attr(),  // Either "automatic" or "manual".
  createdAt: DS.attr('date'),
  updatedAt: DS.attr('date'),

  builds: DS.hasMany('build', {async: true}),
});
