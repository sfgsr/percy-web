import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['PricingFreeSection'],
  classNameBindings: ['classes'],

  actions: {
    sessionRequiresAuthentication: function() {
      this.sendAction('sessionRequiresAuthentication');
    },
  },
});
