import { Factory } from 'ember-cli-mirage';

export default Factory.extend({
  billingEmail(i) { return `billing-email-${i}@example.com`; },
  plan: 'free',
  planUsageLimit: 500,
  currentUsage: 42,
});
