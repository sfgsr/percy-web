import { Factory } from 'ember-cli-mirage';

export default Factory.extend({
  branch: 'master',
  state: 'finished',
  totalComparisonsDiff: 8,
  totalComparisonsFinished: 12,
  createdAt: new Date().getTime(),
  buildNumber(i) { return i + 1; }
});
