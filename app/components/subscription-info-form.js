import Ember from 'ember';
import SubscriptionHelpers from '../lib/subscription-helpers';

export default Ember.Component.extend({
  subscription: null,
  classes: null,

  newBillingEmail: Ember.computed.alias('subscription.billingEmail'),
  showSpinner: false,
  showSuccess: false,

  tagName: 'form',
  classNames: [
    'SubscriptionInfoForm',
  ],
  classNameBindings: [
    'classes',
  ],
  submit(e) {
    e.preventDefault();
    this.send('save');
  },
  actions: {
    save() {
      var self = this;
      var subscription = this.get('subscription');
      subscription.set('billingEmail', this.get('newBillingEmail'));
      self.set('showSuccess', false);  // Flip to false first in case this is the second time.
      self.set('showSpinner', true);

      SubscriptionHelpers.updateMetadata(this.get('newBillingEmail')).then(
        function() {
          self.set('showSpinner', false);
          self.set('showSuccess', true);
        },
        function() {
          alert(
            'An API error occurred! Sorry about that, please ' +
            'contact us at hello@percy.io and we will make sure you are set up correctly.'
          );
          location.reload();
        }
      );

    },
  },
});
