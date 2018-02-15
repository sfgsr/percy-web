import {computed} from '@ember/object';
import Component from '@ember/component';

export default Component.extend({
  comparison: null,

  classNames: ['ComparisonViewer bg-gray-000 border-bottom border-gray-100'],

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
