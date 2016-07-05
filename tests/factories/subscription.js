import FactoryGuy from 'ember-data-factory-guy';

FactoryGuy.define(
  'subscription',
  {
    sequences: {
      plan: (num) => { return `subscription-${num}`; },
    },
    default: {
      style: 'normal',
      plan: FactoryGuy.generate('plan'),
      planUsageLimit: 200000,
      planHistoryLimitDays: 90,
      currentUsage: 0,
      billingEmail: 'fake@example.com',
    },
    traits: {
    }
  }
);
