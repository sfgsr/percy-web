import { Factory } from 'ember-cli-mirage';
import moment from 'moment';

export default Factory.extend({
  branch: 'master',
  state: 'finished',
  totalComparisonsDiff: 8,
  totalComparisonsFinished: 12,
  createdAt() { return moment() },
  buildNumber(i) { return i + 1; }
});
