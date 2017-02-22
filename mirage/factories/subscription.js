import {Factory} from 'ember-cli-mirage';

export default Factory.extend({
  billingEmail(i) {
    return `billing-email-${i}@example.com`;
  },
  currentUsage: 42,

  afterCreate(subscription, server) {
    if (!subscription.plan) {
      let plan = server.create('plan');
      subscription.update({plan});
    }
  },
});
