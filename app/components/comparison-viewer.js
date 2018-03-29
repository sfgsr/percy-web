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
      // console.log('Diff toggled with click on snapshot');
      this.analytics.track('Diff toggled with click on snapshot');
    },
    toggleNoDiffResource() {
      this.toggleProperty('showNoDiffSnapshot');
    },
  },
});
