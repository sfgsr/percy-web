import {Factory, trait} from 'ember-cli-mirage';

export default Factory.extend({
  id(i) {
    return `snapshot-${i}`;
  },
  name(i) {
    return `Exemplifying Test Snapshot That Shows Things ${i}`;
  },

  withComparison: trait({
    afterCreate(snapshot, server) {
      const comparison = server.create('comparison', 'default');
      _addComparisonIds(comparison, snapshot);
    },
  }),

  noDiffs: trait({
    afterCreate(snapshot, server) {
      const comparison = server.create('comparison', 'same');
      _addComparisonIds(comparison, snapshot);
    },
  }),

  withMobile: trait({
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
