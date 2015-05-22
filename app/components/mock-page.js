import Ember from 'ember';

export default Ember.Component.extend({
  showOverlay: true,
  hideOverlay: Ember.computed.not('showOverlay'),

  classNames: ['MockPage'],
  classNameBindings: ['classes'],

  actions: {
    toggleOverlay: function() {
      this.set('showOverlay', !this.get('showOverlay'));
    }
  },
});
