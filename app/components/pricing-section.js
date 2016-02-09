import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['PricingSection'],
  classNameBindings: ['classes'],

  session: Ember.inject.service(),
  currentPlan: null,
  forceAccountPage: false,
  checkoutText: function() {
    return this.get('forceAccountPage') ? 'Select Plan »' : 'Select Plan »';
  }.property('forceAccountPage'),

  basicConcurrencySelected: 2,
  proConcurrencySelected: 5,
  enterpriseConcurrencySelected: 5,

  // Plan ID.
  freePlan: 'free',
  microPlan: 'micro',
  smallPlan: 'small',
  mediumPlan: 'medium',
  largePlan: 'large',
  enterprisePlan: 'enterprise',

  // Price for selected plan.
  microPlanPrice: 9,
  smallPlanPrice: 29,
  mediumPlanPrice: 99,
  largePlanPrice: 249,
  enterprisePlanPrice: 990,

  // Number of diffs for selected plan.
  microPlanDiffs: 750,
  smallPlanDiffs: 2500,
  mediumPlanDiffs: 25000,
  largePlanDiffs: 100000,
  enterprisePlanDiffs: 500000,

  // Plan name.
  microPlanName: 'Micro',
  smallPlanName: 'Small',
  mediumPlanName: 'Medium',
  largePlanName: 'Large',
  enterprisePlanName: 'Enterprise',

  // Current plan flag.
  isFreePlanSelected: Ember.computed.equal('currentPlan', 'free'),
  isMicroPlanSelected: Ember.computed.equal('currentPlan', 'micro'),
  isSmallPlanSelected: Ember.computed.equal('currentPlan', 'small'),
  isMediumPlanSelected: Ember.computed.equal('currentPlan', 'medium'),
  isLargePlanSelected: Ember.computed.equal('currentPlan', 'large'),
  isEnterprisePlanSelected: Ember.computed.equal('currentPlan', 'enterprise'),
});
