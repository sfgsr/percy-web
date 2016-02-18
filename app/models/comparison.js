import Ember from 'ember';
import DS from 'ember-data';

export default DS.Model.extend({
  build: DS.belongsTo('build'),
  headSnapshot: DS.belongsTo('snapshot', {async: false}),
  baseSnapshot: DS.belongsTo('snapshot', {async: false}),
  headScreenshot: DS.belongsTo('snapshot', {async: false}),
  baseScreenshot: DS.belongsTo('snapshot', {async: false}),
  pdiff: DS.belongsTo('pdiff', {async: false}),
  state: DS.attr(),
  startedProcessingAt: DS.attr('date'),
  finishedProcessingAt: DS.attr('date'),
  processingDurationSeconds: function() {
    var finished = this.get('finishedProcessingAt');
    var started = this.get('startedProcessingAt');
    var milliseconds = moment(finished).diff(started);
    return milliseconds / 1000;
  }.property('startedProcessingAt', 'finishedProcessingAt'),
  createdAt: DS.attr('date'),
  updatedAt: DS.attr('date'),

  // If either head or base is NULL, something has changed.
  // Otherwise, rely on the pdiff to tell us if things have changed.
  isSame: Ember.computed.and('headSnapshot', 'baseSnapshot', 'pdiff.isSame'),
  isDifferent: Ember.computed.not('isSame'),
});
