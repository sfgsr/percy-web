import Ember from 'ember';

export default Ember.Component.extend({
  hash: null,

  isVisible: Ember.computed('hash', function() {
    return '#' + this.get('hash') === location.hash;
  }),
});
