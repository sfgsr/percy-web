import Ember from 'ember';
import config from '../config/environment';


export default Ember.Component.extend({
  organization: null,
  plan: null,
  price: null,
  text: 'Select Plan',

  changingSubscription: null,

  // This is set to true when updating credit card info.
  updateCard: false,
  checkoutLabelText: 'Select Plan ({{amount}})',

  subscriptionService: Ember.inject.service('subscriptions'),
  handler: null,
  classes: null,
  attributeBindings: ['href'],
  tagName: 'button',
  classNames: [
    'StripeCheckout',
    'Button',
  ],
  classNameBindings: ['classes'],

  loadStripeCheckout: Ember.on('willInsertElement', function() {
    if (!window.StripeCheckout) {
      var scriptEl = document.createElement('script');
      scriptEl.setAttribute('src','https://checkout.stripe.com/checkout.js');
      // https://stripe.com/blog/checkout-in-more-languages
      scriptEl.setAttribute('data-locale', 'auto');
      scriptEl.setAttribute('data-allow-remember-me', 'false');
      document.head.appendChild(scriptEl);
    }
  }),
  destroyStripeHandler: Ember.on('willDestroyElement', function() {
    if (this.get('handler')) {
      this.get('handler').close();
    }
  }),
  _changeSubscription(plan, token) {
    let organization = this.get('organization');
    let subscriptionService = this.get('subscriptionService');
    let savingPromise = subscriptionService.changeSubscription(organization, plan, token);
    if (this.get('changingSubscription')) {
      this.get('changingSubscription')(savingPromise);
    }
  },
  click() {
    this.send('checkout');
    return false;
  },
  actions: {
    checkout() {
      var self = this;

      // This is intentionally evaluated here, outside of the handlers below, because password
      // managers like 1Password might strangely change the inputs underneath Stripe Checkout
      // when filling out credit card info.
      var chosenPlan = this.get('plan');
      var planName = this.get('planName');

      if (this.get('updateCard') || this.get('organization.subscription.isFree')) {
        this.set('handler', window.StripeCheckout.configure({
          key: config.APP.STRIPE_PUBLISHABLE_KEY,
          image: '/images/percy-bg.png',
          token(token) {
            self._changeSubscription(chosenPlan, token);
          }
        }));
        this.get('handler').open({
          name: 'Percy.io',
          description: 'Subscription to ' + planName + ' plan',
          email: this.get('organization.subscription.billingEmail'),
          amount: this.get('price') * 100,
          panelLabel: this.get('checkoutLabelText'),
          allowRememberMe: false,
        });
      } else {
        var msg = `Ready to change to the ${planName} plan? We'll use your existing payment info.`;
        if (confirm(msg)) {
          self._changeSubscription(chosenPlan);
        }
      }
    },
  },
});
