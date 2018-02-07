import Component from '@ember/component';
import {inject as service} from '@ember/service';
import {computed} from '@ember/object';
import {alias, equal, filterBy, not, or} from '@ember/object/computed';

export default Component.extend({
  // required params
  snapshot: null,
  buildWidths: null,
  flashMessages: service(),
  hasComparisonAtSelectedWidth: null,
  selectedWidth: null,
  selectedComparison: null,

  // optional params
  fullscreen: false,
  comparisonMode: '',
  tagName: '',

  // required actions
  toggleViewMode: null,
  updateSelectedWidth: null,

  // optional actions
  registerChild() {},
  updateComparisonMode() {},

  dropdownVisible: false,
  isShowingFilteredComparisons: true,
  isNotShowingFilteredComparisons: not('isShowingFilteredComparisons'),
  comparisons: alias('snapshot.comparisons'),
  comparisonsWithDiffs: filterBy('snapshot.comparisons', 'isDifferent'),
  noComparisonsHaveDiffs: equal('comparisonsWithDiffs.length', 0),
  isShowingAllComparisons: or('noComparisonsHaveDiffs', 'isNotShowingFilteredComparisons'),
  allWidthsHaveComparisons: computed('comparisons.[]', 'comparisonsWithDiffs.[]', function() {
    return this.get('comparisons.length') === this.get('comparisonsWithDiffs.length');
  }),

  actions: {
    onCopySnapshotUrlToClipboard() {
      this.get('flashMessages').success('Snapshot URL was copied to your clipboard');
    },

    toggleDropdownVisibility() {
      this.toggleProperty('dropdownVisible');
    },

    toggleFilteredComparisons() {
      this.toggleProperty('isShowingFilteredComparisons');
      this.set('dropdownVisible', false);
    },

    closeDropdown() {
      this.set('dropdownVisible', false);
    },
  },
});
