import FactoryGuy from 'ember-data-factory-guy';
import {make} from 'ember-data-factory-guy';
import {SNAPSHOT_APPROVED_STATE, SNAPSHOT_UNAPPROVED_STATE} from 'percy-web/models/snapshot';
import {TEST_COMPARISON_WIDTHS} from 'percy-web/tests/factories/comparison';

FactoryGuy.define('snapshot', {
  default: {
    name: f => `Snapshot ${f.id}`,
    createdAt: () => new Date(),
    updatedAt: () => new Date(),

    comparisons: FactoryGuy.hasMany('comparison'),
    build: FactoryGuy.belongsTo('build'),
    // screenshots: FactoryGuy.belongsTo('screenshot')

    reviewState: SNAPSHOT_UNAPPROVED_STATE,
  },
  traits: {
    approved: {
      reviewState: SNAPSHOT_APPROVED_STATE,
    },

    withBuild: {
      build: () => {
        return make('build');
      },
    },
    withComparisons: {
      comparisons: () => {
        return TEST_COMPARISON_WIDTHS.map(width => {
          return make('comparison', {width});
        });
      },
    },

    withNoDiffs: {
      reviewState: SNAPSHOT_APPROVED_STATE,
      reviewStateReason: 'no_diffs',
      comparisons: () => {
        const widths = [375, 550, 1024];
        return widths.map(width => {
          return make('comparison', {width, diffRatio: 0});
        });
      },
    },

    new: {
      comparisons: () => {
        return TEST_COMPARISON_WIDTHS.map(width => {
          return make('comparison', 'new', {width});
        });
      },
    },

    withScreenshots: {},
    completeExample: {},
  },
});
