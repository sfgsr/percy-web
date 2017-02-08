import {Factory} from 'ember-cli-mirage';

export default Factory.extend({
  id: 'free',
  name: 'Free plan',
  interval: 'month',
  intervalCount: 1,
  workerLimit: 2,
  usageIncluded: 500,
  historyLimitDays: 7,
});
