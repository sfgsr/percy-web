import Ember from 'ember';

export default Ember.Component.extend({
  comparison: null,

  showNoDiffResource: false,
  isOverlayEnabled: true,
  classNames: ['ComparisonViewer'],
  actions: {
    toggleOverlay: function() {
      this.set('isOverlayEnabled', !this.get('isOverlayEnabled'));
    },
    toggleNoDiffResource: function() {
      this.set('showNoDiffResource', !this.get('showNoDiffResource'));
    },
  },
});
