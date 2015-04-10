import Ember from 'ember';
import DS from 'ember-data';

export default DS.Model.extend({
  build: DS.belongsTo('build'),
  headResource: DS.belongsTo('resource', {async: true}),
  baseResource: DS.belongsTo('resource', {async: true}),
  pdiff: DS.belongsTo('pdiff', {async: true}),
  state: DS.attr(),
  createdAt: DS.attr('date'),
  updatedAt: DS.attr('date'),

  // If either head or base is NULL, something has changed.
  // Otherwise, rely on the pdiff to tell us if things have changed.
  isSame: Ember.computed.and('headResource', 'baseResource', 'pdiff.isSame'),
  isDifferent: Ember.computed.not('isSame'),
});
