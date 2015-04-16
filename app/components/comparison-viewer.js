import Ember from 'ember';

export default Ember.Component.extend({
  comparison: null,

  isOverlayEnabled: true,
  classNames: ['ComparisonViewer'],
  actions: {
    toggleOverlay: function() {
      this.set('isOverlayEnabled', !this.get('isOverlayEnabled'));
    },
  },
});
