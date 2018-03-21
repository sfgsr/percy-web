import {computed} from '@ember/object';
import Component from '@ember/component';

export default Component.extend({
  comparison: null,
  showDiffs: null,
  toggleShowDiffs: null,

  classNames: ['ComparisonViewer bg-gray-000 border-bottom border-gray-100'],

  showNoDiffSnapshot: false,
  comparisonUrl: computed(function() {
    return `?comparison=${this.get('comparison.id')}`;
  }),
  actions: {
    toggleOverlay() {
      this.get('toggleShowDiffs')();
    },
    toggleNoDiffResource() {
      this.toggleProperty('showNoDiffSnapshot');
    },
  },
});
