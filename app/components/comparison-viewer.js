import Ember from 'ember';

export default Ember.Component.extend({
  comparison: null,

  showNoDiffSnapshot: false,
  isOverlayEnabled: true,
  classNames: ['ComparisonViewer'],
  actions: {
    toggleOverlay: function() {
      this.set('isOverlayEnabled', !this.get('isOverlayEnabled'));
    },
    toggleNoDiffResource: function() {
      this.set('showNoDiffSnapshot', !this.get('showNoDiffSnapshot'));
    },
  },
});
