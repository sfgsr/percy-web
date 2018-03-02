import {Factory, trait} from 'ember-cli-mirage';
import {
  SNAPSHOT_APPROVED_STATE,
  SNAPSHOT_UNAPPROVED_STATE,
  SNAPSHOT_REVIEW_STATE_REASONS,
} from 'percy-web/models/snapshot';

export default Factory.extend({
  id(i) {
    return `snapshot-${i}`;
  },
  name(i) {
    return `Exemplifying Test Snapshot That Shows Things ${i}`;
  },

  withComparison: trait({
    reviewState: SNAPSHOT_UNAPPROVED_STATE,
    reviewStateReason: SNAPSHOT_REVIEW_STATE_REASONS.UNREVIEWED,
    afterCreate(snapshot, server) {
      const comparison = server.create('comparison', 'default');
      _addComparisonIds(comparison, snapshot);
    },
  }),

  noDiffs: trait({
    reviewState: SNAPSHOT_APPROVED_STATE,
    reviewStateReason: SNAPSHOT_REVIEW_STATE_REASONS.NO_DIFFS,
    afterCreate(snapshot, server) {
      const comparison = server.create('comparison', 'same');
      _addComparisonIds(comparison, snapshot);
    },
  }),

  withMobile: trait({
    reviewState: SNAPSHOT_UNAPPROVED_STATE,
    reviewStateReason: 'unreviewed_comparisons',
    afterCreate(snapshot, server) {
      const comparison = server.create('comparison', 'mobile');
      _addComparisonIds(comparison, snapshot);
    },
  }),
});

function _addComparisonIds(comparison, snapshot) {
  const comparisonIds = snapshot.comparisonIds;
  comparisonIds.push(comparison.id);
  snapshot.comparisonIds = comparisonIds;
  snapshot.save();
}
