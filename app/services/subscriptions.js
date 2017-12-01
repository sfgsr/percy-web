import Service, {inject as service} from '@ember/service';

export default Service.extend({
  store: service(),
  flashMessages: service(),
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

    savingPromise.then(
      () => {},
      () => {
        this.get('flashMessages').createPersistentFlashMessage(
          {
            message:
              'A Stripe error occurred! Your card may have been declined. Please try again or ' +
              'contact us at hello@percy.io and we will help you get set up.',
            type: 'danger',
          },
          {persistentReloads: 1},
        );
        location.reload();
      },
    );
    return savingPromise;
  },
});
