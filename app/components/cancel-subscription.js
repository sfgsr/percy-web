/*eslint max-len: ['error', { 'ignoreStrings': true }]*/
import Ember from 'ember';

export default Ember.Component.extend({
  organization: null,
  classes: null,
  changingSubscription: null,

  subscriptionService: Ember.inject.service('subscriptions'),
  tagName: 'button',
  classNames: [
    'Button',
  ],
  classNameBindings: [
    'classes',
  ],
  click() {
    let organization = this.get('organization');
    let eventProperties = {
      plan_id: this.get('organization.subscription.plan'),
    };
    this.analytics.track('Cancel Subscription Clicked', organization, eventProperties);


    if (!confirm('Are you sure you want to cancel?\n\nWe want to help if we can, just email us at hello@percy.io.')) {
      return;
    }
    let savingPromise = this.get('subscriptionService').changeSubscription(organization, 'free');
    if (this.get('changingSubscription')) {
      this.get('changingSubscription')(savingPromise);
    }
  },
});
