import Ember from 'ember';
import Formatting from '../lib/formatting';

export default Ember.Component.extend({
  classNames: ['PricingSection'],
  classNameBindings: ['classes'],

  forceAccountPage: false,
  checkoutText: function() {
    return this.get('forceAccountPage') ? 'Go To Account...' : 'Select Plan';
  }.property('forceAccountPage'),

  basicConcurrencySelected: 2,
  proConcurrencySelected: 5,
  enterpriseConcurrencySelected: 5,

  // Plan ID.
  freePlan: 'free-2',
  basicPlan: function() {
    return 'basic-%@'.fmt(this.get('basicConcurrencySelected'));
  }.property('basicConcurrencySelected'),
  proPlan: function() {
    return 'pro-%@'.fmt(this.get('proConcurrencySelected'));
  }.property('proConcurrencySelected'),

  // Price for selected plan.
  basicPrice: function() {
    var basicPrices = {
      2: 19,
      5: 49,
      10: 89,
    };
    return basicPrices[this.get('basicConcurrencySelected')];
  }.property('basicConcurrencySelected'),
  proPrice: function() {
    return Math.floor(this.get('proConcurrencySelected') * 1980 / 100);
  }.property('proConcurrencySelected'),

  // Number of diffs for selected plan.
  numVisualDiffsBasic: function() {
    return this.get('basicConcurrencySelected') * 1250;
  }.property('basicConcurrencySelected'),
  numVisualDiffsPro: function() {
    return this.get('proConcurrencySelected') * 5000;
  }.property('proConcurrencySelected'),

  // Plan name.
  basicPlanName: function() {
    var formattedValue = Formatting.formatNumber(this.get('numVisualDiffsBasic'));
    return 'Basic (%@ visual diffs)'.fmt(formattedValue);
  }.property('basicConcurrencySelected'),
  proPlanName: function() {
    var formattedValue = Formatting.formatNumber(this.get('numVisualDiffsPro'));
    return 'Pro (%@ visual diffs)'.fmt(formattedValue);
  }.property('proConcurrencySelected'),

  actions: {
    concurrencyChanged: function(plan, concurrencySelected) {
      this.set(plan + 'ConcurrencySelected', concurrencySelected);
    },
    sessionRequiresAuthentication: function() {
      this.sendAction('sessionRequiresAuthentication');
    },
  },
});
