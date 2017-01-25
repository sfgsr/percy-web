import Ember from 'ember';

export default Ember.Service.extend({
  PLAN_IDS: [
    'free',
    'v2-small',
    'v2-medium',
    'v2-large',
    'v2-enterprise',
  ],
  PLANS: [
    {
      id: 'free',
      name: 'Free',
      monthlyPrice: 0,
      numDiffs: 500,
      numWorkersTitle: '2 parallel workers',
      numUsersTitle: 'Unlimited users',
      historyLimitTitle: '7 day history',
    },
    {
      id: 'v2-small',
      name: 'Starter',
      monthlyPrice: 149,
      numDiffs: 10000,
      extraDiffPrice: 0.01,
      numWorkersTitle: '8 parallel workers',
      historyLimitTitle: '30 day history',
    },
    {
      id: 'v2-medium',
      name: 'Growth',
      monthlyPrice: 399,
      numDiffs: 50000,
      extraDiffPrice: 0.008,
      numWorkersTitle: '16 parallel workers',
      historyLimitTitle: '90 day history',
    },
    {
      id: 'v2-large',
      name: 'Business',
      monthlyPrice: 849,
      numDiffs: 200000,
      extraDiffPrice: 0.006,
      numWorkersTitle: '40 parallel workers',
      historyLimitTitle: '1 year history',
    },
  ],
});
