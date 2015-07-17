import Ember from 'ember';
import config from '../config/environment';
import utils from '../lib/utils';

export default Ember.Component.extend({
  plan: null,
  price: null,

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
  actions: {
    checkout: function() {
      var self = this;
      this.set('handler', window.StripeCheckout.configure({
        key: config.APP.stripePublishableKey,
        image: '/images/percy.svg',
        token: function(token) {
          return Ember.$.ajax({
            type: 'POST',
            url: utils.buildApiUrl('subscriptions'),
            data: {
              plan: self.get('plan'),
              token: token.id,
            },
          }).then(
            function() {
              alert('Success!')
            },
            function() {
              alert('An error with Stripe processing occurred!')
            }
          );
        }
      }));
      this.get('handler').open({
        name: 'Percy.io',
        description: this.get('planName'),
        email: this.get('session.secure.user.email'),
        amount: this.get('price') * 100,
      });
    },
  },
});