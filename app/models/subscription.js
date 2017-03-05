import Ember from 'ember';
import DS from 'ember-data';
import moment from 'moment';

export default DS.Model.extend({
  organization: DS.belongsTo('organization', {async: false}),
  plan: DS.belongsTo('plan', {async: false}),
  billingEmail: DS.attr(),
  currentUsageStats: DS.belongsTo('usage-stat', {async: false}),
  status: DS.attr(),
  currentPeriodStart: DS.attr('date'),
  currentPeriodEnd: DS.attr('date'),
  currentPeriodEndDisplayed: Ember.computed('currentPeriodEnd', function() {
    return moment(this.get('currentPeriodEnd')).subtract(1, 'day').toDate();
  }),
  trialStart: DS.attr('date'),
  trialEnd: DS.attr('date'),
  isTrialOrFree: Ember.computed.or('plan.isTrial', 'plan.isFree'),
  isCustomer: Ember.computed.not('isTrialOrFree'),

  // This is only here so that ember-data will send the token on create, it will never be populated
  // in API responses.
  token: DS.attr(),

  subscriptionData: Ember.inject.service(),
  trialDaysRemaining: Ember.computed('trialEnd', function() {
    return Math.round(moment(this.get('trialEnd')).diff(moment(), 'days', true));
  }),
});

