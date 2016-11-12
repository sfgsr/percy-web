import Ember from 'ember';
import DS from 'ember-data';
import moment from 'moment';

export default DS.Model.extend({
  state: DS.attr(),
  width: DS.attr('number'),

  headSnapshot: DS.belongsTo('snapshot', {async: false}),
  baseSnapshot: DS.belongsTo('snapshot', {async: false}),

  // If headScreenshot is null, the comparison was removed (compared to the base build).
  headScreenshot: DS.belongsTo('snapshot', {async: false}),
  // If baseScreenshot is null, the comparison was added and is new (compared to the base build).
  baseScreenshot: DS.belongsTo('snapshot', {async: false}),
  // If pdiff is set, both headScreenshot and baseScreenshot are guaranteed to exist.
  pdiff: DS.belongsTo('pdiff', {async: false}),

  startedProcessingAt: DS.attr('date'),
  finishedProcessingAt: DS.attr('date'),
  processingDurationSeconds: Ember.computed('startedProcessingAt', 'finishedProcessingAt', function() {
    var finished = this.get('finishedProcessingAt');
    var started = this.get('startedProcessingAt');
    var milliseconds = moment(finished).diff(started);
    return milliseconds / 1000;
  }),
  createdAt: DS.attr('date'),
  updatedAt: DS.attr('date'),

  wasAdded: Ember.computed('headScreenshot', 'baseScreenshot', function() {
    return !!this.get('headScreenshot') && !this.get('baseScreenshot');
  }),
  wasRemoved: Ember.computed('headScreenshot', 'baseScreenshot', function() {
    return !!this.get('baseScreenshot') && !this.get('headScreenshot');
  }),
  wasCompared: Ember.computed.and('pdiff'),

  // Comparison is guaranteed 100% different if head was added or head was removed.
  // Otherwise, rely on the pdiff diff ratio to tell us if pixels changed.
  isDifferent: Ember.computed.or('wasAdded', 'wasRemoved', 'pdiff.isDifferent'),
  isSame: Ember.computed.not('isDifferent'),
});
