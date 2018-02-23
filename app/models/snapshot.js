import DS from 'ember-data';
import {equal} from '@ember/object/computed';
import {alias, mapBy, max, sort, or} from '@ember/object/computed';
import {computed} from '@ember/object';

export const SNAPSHOT_APPROVED_STATE = 'approved';
export const SNAPSHOT_UNAPPROVED_STATE = 'unreviewed';

export default DS.Model.extend({
  comparisons: DS.hasMany('comparisons', {
    async: false,
    inverse: 'headSnapshot',
  }),
  name: DS.attr(),
  build: DS.belongsTo('build', {async: true}),
  screenshots: DS.hasMany('screenshot', {async: false}),

  // Review state.
  reviewState: DS.attr(),
  isUnreviewed: equal('reviewState', SNAPSHOT_UNAPPROVED_STATE),
  isApproved: equal('reviewState', SNAPSHOT_APPROVED_STATE),

  // reviewStateReason provides disambiguation for how reviewState was set, such as when a
  // snapshot was approved automatically by the system when there are no diffs vs. when it is
  // approved by user review.
  //
  // reviewState --> reviewStateReason
  // - 'unreviewed' --> 'unreviewed_comparisons': No reviews have been submitted.
  // - 'approved' --> 'user_approved': approved by user review.
  // - 'approved' --> 'user_approved_previously': automatically approved because a user had recently
  //    approved the same thing in this branch.
  // - 'approved' --> 'no_diffs': automatically approved because there were no visual differences
  //    when compared the baseline.
  reviewStateReason: DS.attr(),
  isApprovedByUser: equal('reviewStateReason', 'user_approved'),
  isApprovedByUserPreviously: equal('reviewStateReason', 'user_approved_previously'),
  isUnchanged: equal('reviewStateReason', 'no_diffs'),

  // Is true for both approved in build and approved by carry-forward.
  isApprovedByUserEver: or('isApprovedByUser', 'isApprovedByUserPreviously'),

  createdAt: DS.attr('date'),
  updatedAt: DS.attr('date'),

  comparisonWidths: mapBy('comparisons', 'width'),
  maxComparisonWidth: max('comparisonWidths'),
  widestComparison: alias('comparisonsSortedByWidth.lastObject'),

  comparisonsSortedByWidth: sort('comparisons', 'widthSort'),
  widthSort: ['width'],

  maxWidthComparisonWithDiff: computed('comparisonsSortedByWidth.[]', function() {
    return this.get('comparisonsSortedByWidth')
      .filterBy('isDifferent')
      .get('lastObject');
  }),
  maxComparisonWidthWithDiff: alias('maxWidthComparisonWidthDiff.width'),

  comparisonForWidth(width) {
    return this.get('comparisons').findBy('width', parseInt(width, 10));
  },
});
