import Ember from 'ember';
import DS from 'ember-data';
import moment from 'moment';

export default DS.Model.extend({
  project: DS.belongsTo('project', {async: false}),
  repo: DS.belongsTo('repo', {async: false}),

  // Check isGithubLinked before accessing repo.
  isGithubLinked: Ember.computed.bool('repo'),

  buildNumber: DS.attr('number'),
  branch: DS.attr(),

  // States.
  state: DS.attr(),
  isPending: Ember.computed.equal('state', 'pending'),
  isProcessing: Ember.computed.equal('state', 'processing'),
  isFinished: Ember.computed.equal('state', 'finished'),
  isFailed: Ember.computed.equal('state', 'failed'),
  isExpired: Ember.computed.equal('state', 'expired'),

  failureReason: DS.attr(),
  failureReasonHumanized: Ember.computed('failureReason', function() {
    let failureReason = this.get('failureReason');
    if (failureReason === 'missing_resources') {
      return 'Missing resources';
    } else if (failureReason === 'no_snapshots') {
      return 'No snapshots';
    } else if (failureReason === 'render_timeout') {
      return 'Timed out';
    }
  }),

  commit: DS.belongsTo('commit', {async: false}),  // Might be null.
  baseBuild: DS.belongsTo('build', {async: false, inverse: null}),
  comparisons: DS.hasMany('comparison', {async: true}),
  snapshots: DS.hasMany('snapshot', {async: true}),

  comparisonWidths: Ember.computed('comparisons', function() {
    // TODO(fotinakis): use a JavaScript Set when the world has advanced.
    var widths = [];
    this.get('comparisons').forEach(function(comparison) {
      let width = comparison.get('width');
      if (widths.indexOf(width) === -1) {
        widths.push(width);
      }
    });
    return widths.sort(function(a, b) { return a - b; });
  }),
  numComparisonWidths: Ember.computed('comparisonWidths', function() {
    return this.get('comparisonWidths').length;
  }),

  totalComparisonsFinished: DS.attr('number'),
  totalComparisonsDiff: DS.attr('number'),
  hasDiffs: Ember.computed('totalComparisonsDiff', function() {
    // Only have the chance to return true if the build is finished.
    if (!this.get('isFinished')) {
      return false;
    }
    return (this.get('totalComparisonsDiff') > 0);
  }),

  isPullRequest: DS.attr('boolean'),
  pullRequestNumber: DS.attr('number'),
  pullRequestTitle: DS.attr(),

  finishedAt: DS.attr('date'),
  approvedAt: DS.attr('date'),
  approvedBy: DS.belongsTo('user', {async: false}),
  createdAt: DS.attr('date'),
  updatedAt: DS.attr('date'),

  duration: Ember.computed('finishedAt', 'createdAt', function() {
    var finished = this.get('finishedAt');
    if (!finished) {
      finished = moment();
    }
    var started = this.get('createdAt');
    var milliseconds = moment(finished).diff(started);
    return moment.duration(milliseconds);
  }),

  // Convenience methods for accessing common methods in templates.
  durationHours: Ember.computed('duration', function() {
    return this.get('duration').hours();
  }),
  durationMinutes: Ember.computed('duration', function() {
    return this.get('duration').minutes();
  }),
  durationSeconds: Ember.computed('duration', function() {
    return this.get('duration').seconds();
  }),

  isApproved: Ember.computed('approvedAt', function() {
    return !!this.get('approvedAt');
  }),

  reloadAll() {
    this.store.findRecord('build', this.get('id'), {reload: true});
  },
});
