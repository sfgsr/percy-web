import {Factory, trait} from 'ember-cli-mirage';
import moment from 'moment';

export default Factory.extend({
  branch: 'master',
  state: 'finished',
  review_state: 'unreviewed',
  review_state_reason: 'unreviewed_snapshots',
  totalComparisonsDiff: 8,
  totalComparisonsFinished: 12,
  createdAt() {
    return moment();
  },
  buildNumber(i) {
    return i + 1;
  },

  processing: trait({
    state: 'processing',
    totalComparisons: 2312,
    totalComparisonsFinished: 1543,
  }),
});
