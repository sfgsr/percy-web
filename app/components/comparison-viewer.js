import {computed} from '@ember/object';
import Component from '@ember/component';

export default Component.extend({
  comparison: null,

  classNames: ['ComparisonViewer'],
  hasNoWidth: computed('comparison', 'snapshotSelectedWidth', function() {
    return parseInt(this.get('snapshotSelectedWidth')) !== this.get('comparison.width');
  }),
  showNoDiffSnapshot: false,
  isOverlayEnabled: true,
  comparisonUrl: computed(function() {
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
