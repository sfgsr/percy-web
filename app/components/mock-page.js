import Ember from 'ember';

export default Ember.Component.extend({
  showOverlay: true,
  hideOverlay: Ember.computed.not('showOverlay'),

  classNames: ['MockPage'],
  classNameBindings: ['classes'],

  showWhenOverlay: function() {
    return (this.get('hideOverlay') ? 'display: none' : '').htmlSafe();
  }.property('showOverlay'),
  hideWhenOverlay: function() {
    return (this.get('showOverlay') ? 'display: none' : '').htmlSafe();
  }.property('hideOverlay'),

  actions: {
    toggleOverlay: function() {
      this.set('showOverlay', !this.get('showOverlay'));
    }
  },
});
