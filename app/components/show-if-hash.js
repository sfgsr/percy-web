import Ember from 'ember';

export default Ember.Component.extend({
  hash: null,

  isVisible: function() {
    return '#' + this.get('hash') == location.hash;
  }.property('hash'),
});
