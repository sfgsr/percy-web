import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['PricingSection'],
  classNameBindings: ['classes'],

  session: Ember.inject.service(),
  subscriptionData: Ember.inject.service(),
  currentSubscription: Ember.computed.alias('session.data.authenticated.user.subscription'),
  checkoutText: 'Select Plan »',
});
