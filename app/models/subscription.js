import Ember from 'ember';
import DS from 'ember-data';

export default DS.Model.extend({
  organization: DS.belongsTo('organization'),
  plan: DS.attr(),
  planName: DS.attr(),
  planNumWorkers: DS.attr('number'),
  planUsageLimit: DS.attr('number'),
  planHistoryLimitDays: DS.attr('number'),
  currentUsage: DS.attr('number'),
  billingEmail: DS.attr(),

  // This is only here so that ember-data will send the token on create, it will never be populated
  // in API responses.
  token: DS.attr(),

  subscriptionData: Ember.inject.service(),
  currentUsageRemaining: Ember.computed('currentUsage', 'planUsageLimit', function() {
    return this.get('planUsageLimit') - this.get('currentUsage');
  }),
  isCustomPlan: Ember.computed('plan', function() {
    return this.get('subscriptionData.PLAN_IDS').indexOf(this.get('plan')) === -1;
  }),

  isFree: Ember.computed.equal('plan', 'free'),
  isPaid: Ember.computed.not('isFree'),
});

