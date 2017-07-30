/*eslint max-len: ['error', { 'ignoreStrings': true }]*/
import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),

  organization: null,
  classes: null,
  changingSubscription: null,

  subscriptionService: Ember.inject.service('subscriptions'),
  tagName: 'button',
  classNames: ['Button'],
  classNameBindings: ['classes'],
  click() {
    let organization = this.get('organization');
    let eventProperties = {
      plan_id: this.get('organization.subscription.plan'),
    };
    this.analytics.track('Cancel Subscription Clicked', organization, eventProperties);

    // Get or create the plan record with the right ID.
    let plan = this.get('store').peekRecord('plan', 'free');
    plan = plan || this.get('store').createRecord('plan', {id: 'free'});

    let confirmation = confirm(
      'Are you sure you want to cancel?\n\nWe want to help if we can, just email us at hello@percy.io.',
    );
    if (!confirmation) {
      return;
    }
    let savingPromise = this.get('subscriptionService').changeSubscription(organization, plan);
    if (this.get('changingSubscription')) {
      this.get('changingSubscription')(savingPromise);
    }
  },
});
