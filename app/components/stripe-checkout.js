import Ember from 'ember';
import config from '../config/environment';
import utils from '../lib/utils';
import SubscriptionHelpers from '../lib/subscription-helpers';

export default Ember.Component.extend({
  plan: null,
  price: null,
  text: 'Select Plan',

  // This is set to true when updating credit card info.
  updateCard: false,
  checkoutLabelText: 'Select Plan ({{amount}})',

  session: Ember.inject.service(),
  handler: null,
  classes: null,
  attributeBindings: ['href'],
  tagName: 'button',
  classNames: [
    'StripeCheckout',
  ],
  classNameBindings: ['classes', 'updateCard::Button--primary'],

  loadStripeCheckout: function() {
    if (!window.StripeCheckout) {
      var scriptEl = document.createElement('script');
      scriptEl.setAttribute('src','https://checkout.stripe.com/checkout.js');
      // https://stripe.com/blog/checkout-in-more-languages
      scriptEl.setAttribute('data-locale', 'auto');
      document.head.appendChild(scriptEl);
    }
  }.on('willInsertElement'),
  destroyStripeHandler: function() {
    if (this.get('handler')) {
      this.get('handler').close();
    }
  }.on('willDestroyElement'),
  _changeSubscription: function(plan, token) {
    return SubscriptionHelpers.changeSubscription(plan, token).then(
      function() {
        location.href = '/account#success';
        location.reload();  // If we are already on the account page.
      },
      function() {
        alert(
          'A Stripe error occurred! Your card may have been declined. Please try again or ' +
          'contact us at team@percy.io and we will help you get set up.'
        );
      }
    );
  },
  click: function() {
    this.send('checkout');
    return false;
  },
  actions: {
    checkout: function() {
      var self = this;

      // This is intentionally evaluated here, outside of the handlers below, because password
      // managers like 1Password might strangely change the inputs underneath Stripe Checkout
      // when filling out credit card info.
      var chosenPlan = this.get('plan');
      var planName = this.get('planName');

      // Specific UX flow: if the user is not logged in but clicks 'Select Plan', redirect to
      // login then to /account.
      if (!this.get('session.isAuthenticated')) {
        utils.redirectToLogin({redirectTo: '/account'});
        return;
      }

      if (this.get('updateCard') || this.get('session.data.authenticated.user.subscription.isFree')) {
        this.set('handler', window.StripeCheckout.configure({
          key: config.APP.stripePublishableKey,
          image: '/images/percy-bg.png',
          token: function(token) {
            self._changeSubscription(chosenPlan, token);
          }
        }));
        this.get('handler').open({
          name: 'Percy.io',
          description: 'Subscription to ' + planName + ' plan',
          email: this.get('session.data.authenticated.user.email'),
          amount: this.get('price') * 100,
          panelLabel: this.get('checkoutLabelText'),
          allowRememberMe: false,
        });
      } else {
        var msg = "Ready to change to the " + planName + " plan? We'll use your existing payment info.";
        if (confirm(msg)) {
          self._changeSubscription(chosenPlan);
        }
      }
    },
  },
});