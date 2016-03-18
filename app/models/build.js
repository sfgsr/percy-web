import Ember from 'ember';
import DS from 'ember-data';
import moment from 'moment';

export default DS.Model.extend({
  repo: DS.belongsTo('repo', {async: true}),
  buildNumber: DS.attr('number'),
  branch: DS.attr(),

  // States.
  state: DS.attr(),
  isPending: Ember.computed.equal('state', 'pending'),
  isProcessing: Ember.computed.equal('state', 'processing'),
  isFinished: Ember.computed.equal('state', 'finished'),
  isFailed: Ember.computed.equal('state', 'failed'),
  failureReason: DS.attr(),
  failureReasonHumanized: function() {
    let failureReason = this.get('failureReason');
    if (failureReason === 'missing_resources') {
      return 'Missing resources';
    } else if (failureReason === 'no_snapshots') {
      return 'No snapshots';
    }
  }.property('failureReason'),

  commit: DS.belongsTo('commit', {async: false}),  // Might be null.
  baseBuild: DS.belongsTo('build', {async: false}),
  comparisons: DS.hasMany('comparison', {async: true}),
  snapshots: DS.hasMany('snapshot', {async: true}),

  comparisonWidths: function() {
    // TODO(fotinakis): use a JavaScript Set when the world has advanced.
    var widths = [];
    this.get('comparisons').forEach(function(comparison) {
      let width = comparison.get('width');
      if (widths.indexOf(width) === -1) {
        widths.push(width);
      }
    });
    return widths.sort(function(a, b) { return a - b; });
  }.property('comparisons'),
  numComparisonWidths: function() {
    return this.get('comparisonWidths').length;
  }.property('comparisonWidths'),

  totalComparisonsFinished: DS.attr('number'),
  totalComparisonsDiff: DS.attr('number'),
  hasDiffs: function() {
    // Only have the chance to return true if the build is finished.
    if (!this.get('isFinished')) {
      return false;
    }
    return (this.get('totalComparisonsDiff') > 0);
  }.property('totalComparisonsDiff'),

  isPullRequest: DS.attr('boolean'),
  pullRequestNumber: DS.attr('number'),
  pullRequestTitle: DS.attr(),

  finishedAt: DS.attr('date'),
  approvedAt: DS.attr('date'),
  approvedBy: DS.belongsTo('user', {async: false}),
  createdAt: DS.attr('date'),
  updatedAt: DS.attr('date'),

  duration: function() {
    var finished = this.get('finishedAt');
    if (!finished) {
      finished = moment();
    }
    var started = this.get('createdAt');
    var milliseconds = moment(finished).diff(started);
    return moment.duration(milliseconds);
  }.property('finishedAt', 'createdAt'),

  // Convenience methods for accessing common methods in templates.
  durationHours: function() {
    return this.get('duration').hours();
  }.property('duration'),
  durationMinutes: function() {
    return this.get('duration').minutes();
  }.property('duration'),
  durationSeconds: function() {
    return this.get('duration').seconds();
  }.property('duration'),

  isApproved: function() {
    return !!this.get('approvedAt');
  }.property('approvedAt'),

  reloadAll: function() {
    this.store.findRecord('build', this.get('id'), {reload: true});
  },
});
