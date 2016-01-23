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

  commit: DS.belongsTo('commit'),  // Might be null.
  baseBuild: DS.belongsTo('build'),
  comparisons: DS.hasMany('comparison', {async: true}),
  snapshots: DS.hasMany('snapshot', {async: true}),

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
  approvedBy: DS.belongsTo('user'),
  createdAt: DS.attr('date'),
  updatedAt: DS.attr('date'),

  durationSeconds: function() {
    var finished = this.get('finishedAt');
    if (!finished) {
      finished = moment();
    }
    var started = this.get('createdAt');
    var milliseconds = moment(finished).diff(started);
    return milliseconds / 1000;
  }.property('finishedAt', 'createdAt'),

  isApproved: function() {
    return !!this.get('approvedAt');
  }.property('approvedAt'),

  reloadAll: function() {
    this.store.findOne('build', this.get('id'));
  },
});
