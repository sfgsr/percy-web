import Ember from 'ember';
import SubscriptionHelpers from '../lib/subscription-helpers';

export default Ember.Component.extend({
  tagName: 'button',
  classes: null,

  classNames: [
    'Button',
  ],
  classNameBindings: [
    'classes',
  ],
  click: function() {
    if (confirm('Are you sure you want to cancel?\n\nWe want to help if we can, just email us at team@percy.io.')) {
      SubscriptionHelpers.changeSubscription('free-2').then(
        function() {
          // Refresh after canceling plan.
          location.reload();
        },
        function() {
          alert(
            'A Stripe error occurred! Sorry about that, please ' +
            'contact us at team@percy.io and we will make sure you are set up correctly.'
          );
          location.reload();
        }
      );
    }
  },
});
