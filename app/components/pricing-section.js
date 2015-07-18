import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['PricingSection'],
  classNameBindings: ['classes'],

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
  enterprisePlan: function() {
    return 'enterprise-%@'.fmt(this.get('enterpriseConcurrencySelected'));
  }.property('enterpriseConcurrencySelected'),

  // Price for selected plan.
  basicPrice: function() {
    return Math.floor(this.get('basicConcurrencySelected') * 980 / 100);
  }.property('basicConcurrencySelected'),
  proPrice: function() {
    return Math.floor(this.get('proConcurrencySelected') * 1980 / 100);
  }.property('proConcurrencySelected'),
  enterprisePrice: function() {
    return Math.floor(this.get('enterpriseConcurrencySelected') * 9980 / 100);
  }.property('enterpriseConcurrencySelected'),

  // Number of diffs for selected plan.
  numVisualDiffsBasic: function() {
    return this.get('basicConcurrencySelected') * 1250;
  }.property('basicConcurrencySelected'),
  numVisualDiffsPro: function() {
    return this.get('proConcurrencySelected') * 5000;
  }.property('proConcurrencySelected'),

  // Plan name.
  basicPlanName: function() {
    return 'Basic (%@ workers)'.fmt(this.get('basicConcurrencySelected'));
  }.property('basicConcurrencySelected'),
  proPlanName: function() {
    return 'Pro (%@ workers)'.fmt(this.get('proConcurrencySelected'));
  }.property('proConcurrencySelected'),
  enterprisePlanName: function() {
    return 'Enterprise (%@ workers)'.fmt(this.get('enterpriseConcurrencySelected'));
  }.property('enterpriseConcurrencySelected'),

  actions: {
    concurrencyChanged: function(plan, concurrencySelected) {
      this.set(plan + 'ConcurrencySelected', concurrencySelected);
    },
    sessionRequiresAuthentication: function() {
      this.sendAction('sessionRequiresAuthentication');
    },
  },
});
