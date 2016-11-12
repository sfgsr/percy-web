import Ember from 'ember';

export default Ember.Service.extend({
  store: Ember.inject.service(),
  changeSubscription(organization, plan, token) {
    // Always create a new POST request to change subscription, don't modify the subscription
    // object directly unless just changing attributes.
    let subscription = this.get('store').createRecord('subscription', {
      organization: organization,
      billingEmail: organization.get('subscription.billingEmail'),
      plan: plan,
      token: token && token.id,
    });
    let savingPromise = subscription.save();
    savingPromise.then(() => {}, () => {
      alert(
        'A Stripe error occurred! Your card may have been declined. Please try again or ' +
        'contact us at hello@percy.io and we will help you get set up.'
      );
      location.reload();
    });
    return savingPromise;
  }
});
