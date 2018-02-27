import {Factory, trait} from 'ember-cli-mirage';
import {SNAPSHOT_APPROVED_STATE, SNAPSHOT_UNAPPROVED_STATE} from 'percy-web/models/snapshot';

export default Factory.extend({
  id(i) {
    return `snapshot-${i}`;
  },
  name(i) {
    return `Exemplifying Test Snapshot That Shows Things ${i}`;
  },

  withComparison: trait({
    reviewState: SNAPSHOT_UNAPPROVED_STATE,
    reviewStateReason: 'unreviewed_comparisons',
    afterCreate(snapshot, server) {
      const comparison = server.create('comparison', 'default');
      _addComparisonIds(comparison, snapshot);
    },
  }),

  noDiffs: trait({
    reviewState: SNAPSHOT_APPROVED_STATE,
    reviewStateReason: 'no_diffs',
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
