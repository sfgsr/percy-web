import Ember from 'ember';
import DS from 'ember-data';

export default DS.Model.extend({
  organization: DS.belongsTo('organization'),
  plan: DS.belongsTo('plan', {async: false}),
  billingEmail: DS.attr(),
  currentUsage: DS.attr('number'),

  status: DS.attr(),
  isTrialing: Ember.computed.equal('status', 'trialing'),

  currentPeriodStart: DS.attr('date'),
  currentPeriodEnd: DS.attr('date'),
  trialStart: DS.attr('date'),
  trialEnd: DS.attr('date'),

  // This is only here so that ember-data will send the token on create, it will never be populated
  // in API responses.
  token: DS.attr(),

  subscriptionData: Ember.inject.service(),
  currentUsageRemaining: Ember.computed('currentUsage', 'plan.usageIncluded', function() {
    return this.get('plan.usageIncluded') - this.get('currentUsage');
  }),
});

