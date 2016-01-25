import Ember from 'ember';
import DS from 'ember-data';

export default DS.Model.extend({
  build: DS.belongsTo('build'),
  headSnapshot: DS.belongsTo('snapshot', {async: false}),
  baseSnapshot: DS.belongsTo('snapshot', {async: false}),
  pdiff: DS.belongsTo('pdiff', {async: false}),
  state: DS.attr(),
  createdAt: DS.attr('date'),
  updatedAt: DS.attr('date'),

  // If either head or base is NULL, something has changed.
  // Otherwise, rely on the pdiff to tell us if things have changed.
  isSame: Ember.computed.and('headSnapshot', 'baseSnapshot', 'pdiff.isSame'),
  isDifferent: Ember.computed.not('isSame'),
});
