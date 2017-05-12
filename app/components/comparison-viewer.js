import Ember from 'ember';

export default Ember.Component.extend({
  comparison: null,
  
  classNames: ['ComparisonViewer'],
  hasNoWidth: Ember.computed('comparison', 'snapshotSelectedWidth', function() {
    return parseInt(this.get('snapshotSelectedWidth')) !== this.get('comparison.width');
  }),
  showNoDiffSnapshot: false,
  isOverlayEnabled: true,
  comparisonUrl: Ember.computed(function() {
    return `?comparison=${this.get('comparison.id')}`;
  }),
  actions: {
    toggleOverlay() {
      this.toggleProperty('isOverlayEnabled');
    },
    toggleNoDiffResource() {
      this.toggleProperty('showNoDiffSnapshot');
    },
  },
});
