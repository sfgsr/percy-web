import Ember from 'ember';

export default Ember.Component.extend({
  subscription: null,
  classes: null,
  newBillingEmail: Ember.computed.alias('subscription.billingEmail'),

  classNames: [
    'SubscriptionInfoForm',
  ],
  classNameBindings: [
    'classes',
  ],
  actions: {
    save: function() {
      var subscription = this.get('subscription');
      subscription.set('billingEmail', this.get('newBillingEmail'));
      subscription.save();
    },
  },
});
