import Ember from 'ember';
import config from '../config/environment';
import utils from '../lib/utils';

export default Ember.Component.extend({
  classes: null,
  classNames: ['StripeCheckout'],
  classNameBindings: ['classes'],

  destroyStripeHandler: function() {
    if (this.handler) {
      this.handler.close();
    }
  }.on('willDestroyElement'),
  actions: {
    checkout: function() {
      this.handler = window.StripeCheckout.configure({
        key: config.APP.stripePublishableKey,
        image: '/images/percy.svg',
        token: function(token) {
          // Use the token to create the charge with a server-side script.
          // You can access the token ID with `token.id`
          console.log(token.id)

          return Ember.$.ajax({
            type: 'POST',
            url: utils.buildApiUrl('subscriptions'),
          }).then(
            function() {
              console.log('true')
            },
            function() {
              console.log('false')
            }
          );
        }
      });
      this.handler.open({
        name: 'Percy.io',
        description: 'Basic Plan (2 workers)',
        email: this.get('session.secure.user.email'),
        amount: 1900,
      });
    },
  },
});