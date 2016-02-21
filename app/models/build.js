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

  commit: DS.belongsTo('commit', {async: false}),  // Might be null.
  baseBuild: DS.belongsTo('build', {async: false}),
  comparisons: DS.hasMany('comparison', {async: true}),
  snapshots: DS.hasMany('snapshot', {async: true}),

  comparisonWidths: function() {
    var widths = new Set();
    this.get('comparisons').forEach(function(comparison) {
      widths.add(comparison.get('width'));
    });
    return widths;
  }.property('comparisons'),

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
    return milliseconds;
  }.property('finishedAt', 'createdAt'),

  isApproved: function() {
    return !!this.get('approvedAt');
  }.property('approvedAt'),

  reloadAll: function() {
    this.store.findRecord('build', this.get('id'), {reload: true});
  },
});
