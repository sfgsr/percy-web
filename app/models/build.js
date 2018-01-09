import {computed} from '@ember/object';
import {bool, and, equal, max, not, or} from '@ember/object/computed';
import DS from 'ember-data';
import moment from 'moment';

const WAITING_LABEL = 'Processing';
const UNREVIEWED_LABEL = 'Unreviewed';
const APPROVED_LABEL = 'Approved';
const FAILED_LABEL = 'Failed';
const EXPIRED_LABEL = 'Expired';

export default DS.Model.extend({
  project: DS.belongsTo('project', {async: false}),
  repo: DS.belongsTo('repo', {async: false}),

  // Check isGithubLinked before accessing repo.
  isGithubLinked: bool('repo'),

  isGithubPullRequest: and('isGithubLinked', 'isPullRequest'),

  buildNumber: DS.attr('number'),
  buildTitle: computed('buildNumber', function() {
    return `Build #${this.get('buildNumber')}`;
  }),
  branch: DS.attr(),

  // States.
  state: DS.attr(),
  isPending: equal('state', 'pending'),
  isProcessing: equal('state', 'processing'),
  isFinished: equal('state', 'finished'),
  isFailed: equal('state', 'failed'),
  isExpired: equal('state', 'expired'),
  isWaiting: or('isPending', 'isProcessing'),

  buildStatusLabel: computed('state', function() {
    if (this.get('isWaiting')) {
      return WAITING_LABEL;
    } else if (this.get('isFinished')) {
      if (this.get('isApproved') || this.get('hasNoDiffs')) {
        return APPROVED_LABEL;
      } else {
        return UNREVIEWED_LABEL;
      }
    } else if (this.get('isFailed')) {
      return FAILED_LABEL;
    } else if (this.get('isExpired')) {
      return EXPIRED_LABEL;
    }
  }),

  failureReason: DS.attr(),
  failureReasonHumanized: computed('failureReason', function() {
    let failureReason = this.get('failureReason');
    if (failureReason === 'missing_resources') {
      return 'Missing resources';
    } else if (failureReason === 'no_snapshots') {
      return 'No snapshots';
    } else if (failureReason === 'render_timeout') {
      return 'Timed out';
    }
  }),

  commit: DS.belongsTo('commit', {async: false}), // Might be null.
  baseBuild: DS.belongsTo('build', {async: false, inverse: null}),
  comparisons: DS.hasMany('comparison', {async: true}),

  snapshots: computed('comparisons', function() {
    let comparisons = this.get('comparisons');
    let snapshots = comparisons.map(comparison => comparison.get('headSnapshot')).filter(x => x);
    return [...new Set(snapshots)];
  }),

  comparisonWidths: computed('comparisons', function() {
    let widths = [...new Set(this.get('comparisons').map(c => c.get('width')))];
    return widths.sort((a, b) => a - b);
  }),

  defaultSelectedWidth: max('comparisonWidths'),
  numComparisonWidths: computed('comparisonWidths', function() {
    return this.get('comparisonWidths').length;
  }),

  totalComparisonsFinished: DS.attr('number'),
  totalComparisonsDiff: DS.attr('number'),
  hasDiffs: computed('totalComparisonsDiff', function() {
    // Only have the chance to return true if the build is finished.
    if (!this.get('isFinished')) {
      return false;
    }
    return this.get('totalComparisonsDiff') > 0;
  }),

  hasNoDiffs: not('hasDiffs'),
  isPullRequest: DS.attr('boolean'),
  pullRequestNumber: DS.attr('number'),
  pullRequestTitle: DS.attr(),

  finishedAt: DS.attr('date'),
  approvedAt: DS.attr('date'),
  approvedBy: DS.belongsTo('user', {async: false}),
  createdAt: DS.attr('date'),
  updatedAt: DS.attr('date'),
  userAgent: DS.attr(),

  duration: computed('finishedAt', 'createdAt', function() {
    var finished = this.get('finishedAt');
    if (!finished) {
      finished = moment();
    }
    var started = this.get('createdAt');
    var milliseconds = moment(finished).diff(started);
    return moment.duration(milliseconds);
  }),

  // Convenience methods for accessing common methods in templates.
  durationHours: computed('duration', function() {
    return this.get('duration').hours();
  }),
  durationMinutes: computed('duration', function() {
    return this.get('duration').minutes();
  }),
  durationSeconds: computed('duration', function() {
    return this.get('duration').seconds();
  }),

  isApproved: computed('approvedAt', function() {
    return !!this.get('approvedAt');
  }),

  reloadAll() {
    return this.store.findRecord('build', this.get('id'), {reload: true});
  },
});
