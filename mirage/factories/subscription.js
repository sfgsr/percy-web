import { Factory } from 'ember-cli-mirage';

export default Factory.extend({
  billingEmail(i) { return `email${i}@domain.com`; },
  plan: 'free',
  planUsageLimit: 500,
  currentUsage: 42
});
