import Ember from 'ember';
import config from '../config/environment';
import utils from '../lib/utils';
import SubscriptionHelpers from '../lib/subscription-helpers';

export default Ember.Component.extend({
  plan: null,
  price: null,
  text: 'Select Plan',

  // This is set to true when updating credit card info.
  forceCheckout: false,
  checkoutLabelText: 'Select Plan ({{amount}})',

  // Set on the homepage to force users to pick plan from account page.
  forceAccountPage: false,

  handler: null,
  classes: null,
  tagName: 'button',
  classNames: [
    'StripeCheckout',
    'Button',
  ],
  classNameBindings: ['classes', 'forceCheckout::Button--primary'],

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
        location.reload();
      },
      function() {
        alert(
          'A Stripe error occurred! Sorry about that, please ' +
          'contact us at team@percy.io and we will make sure you are set up correctly.'
        );
      }
    );
  },
  click: function() {
    this.send('checkout');
  },
  actions: {
    checkout: function() {
      var self = this;

      // This is intentionally evaluated here, outside of the handlers below, because password
      // managers like 1Password strangely change the select boxes underneath Stripe Checkout
      // when filling out credit card info.
      var chosenPlan = this.get('plan');
      var planName = this.get('planName');

      // Specific UX flow: if the user is not logged in but clicks 'Select Plan', redirect to
      // login then to /account. Or, if they are logged in and forceAccountPage is set. :|
      if (this.get('forceAccountPage') || !this.get('session.isAuthenticated')) {
        utils.redirectToLogin({redirectTo: '/account'});
        return;
      }

      if (this.get('forceCheckout') || this.get('session.secure.user.subscription.isFree')) {
        this.set('handler', window.StripeCheckout.configure({
          key: config.APP.stripePublishableKey,
          image: '/images/percy-bg.png',
          token: function(token) {
            self._changeSubscription(chosenPlan, token);
          }
        }));
        this.get('handler').open({
          name: 'Percy.io',
          description: planName,
          email: this.get('session.secure.user.email'),
          amount: this.get('price') * 100,
          panelLabel: this.get('checkoutLabelText'),
          allowRememberMe: false,
        });
      } else {
        var msg = "Ready to change plans to " + planName + "? We'll use your existing payment info."
        if (confirm(msg)) {
          self._changeSubscription(chosenPlan);
        }
      }
    },
  },
});