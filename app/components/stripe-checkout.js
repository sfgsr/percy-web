import Ember from 'ember';
import config from '../config/environment';
import utils from '../lib/utils';

export default Ember.Component.extend({
  plan: null,
  price: null,

  // If false, a confirmation dialog for upgrading the plan will be presented instead.
  // This is used when Stripe already has the customer's card info and we can instantly upgrade.
  requestCard: true,

  handler: null,
  classes: null,
  classNames: ['StripeCheckout'],
  classNameBindings: ['classes'],

  loadStripeCheckout: function() {
    if (!window.StripeCheckout) {
      var scriptEl = document.createElement('script');
      scriptEl.setAttribute('src','https://checkout.stripe.com/checkout.js');
      document.head.appendChild(scriptEl);
    }
  }.on('willInsertElement'),
  destroyStripeHandler: function() {
    if (this.get('handler')) {
      this.get('handler').close();
    }
  }.on('willDestroyElement'),
  _upgradePlan: function(plan, token) {
    return Ember.$.ajax({
      type: 'POST',
      url: utils.buildApiUrl('subscriptions'),
      data: {
        plan: plan,
        token: token && token.id,
      },
    }).then(
      function() {
        window.reload();
      },
      function() {
        alert('An error with Stripe processing occurred!');
      }
    );
  },
  actions: {
    checkout: function() {
      var self = this;
      if (this.get('requestCard')) {
        this.set('handler', window.StripeCheckout.configure({
          key: config.APP.stripePublishableKey,
          image: '/images/percy.svg',
          token: function(token) {
            self._upgradePlan(self.get('plan'), token);
          }
        }));
        this.get('handler').open({
          name: 'Percy.io',
          description: this.get('planName'),
          email: this.get('session.secure.user.email'),
          amount: this.get('price') * 100,
          panelLabel: 'Upgrade! ({{amount}})',
          allowRememberMe: false,
        });
      } else {
        if (confirm('Ready to upgrade?')) {
          self._upgradePlan(self.get('plan'));
        }
      }
    },
  },
});