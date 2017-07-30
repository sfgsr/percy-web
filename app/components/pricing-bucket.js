import Ember from 'ember';

export default Ember.Component.extend({
  plan: null,
  classes: null,
  promoted: false,

  classNames: ['PricingBucket'],
  classNameBindings: ['classes', 'promoted:PricingBucket--promoted'],
  actions: {},
});
