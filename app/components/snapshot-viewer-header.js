import Component from '@ember/component';
import {inject as service} from '@ember/service';
import {computed} from '@ember/object';
import {alias, equal, filterBy, not, or} from '@ember/object/computed';
import utils from 'percy-web/lib/utils';

export default Component.extend({
  // required params
  snapshot: null,
  flashMessages: service(),
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
  isShowingAllComparisons: or('noComparisonsHaveDiffs', 'isNotShowingFilteredComparisons'),
  noComparisonsHaveDiffs: equal('comparisonsWithDiffs.length', 0),
  allComparisonsHaveDiffs: computed('comparisons.[]', 'comparisonsWithDiffs.[]', function() {
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

    downloadHTML(type, snapshot) {
      const url = utils.buildApiUrl(`${type}Asset`, snapshot.get('id'));
      window.location.replace(url);
      this.set('dropdownVisible', false);
    },
  },
});
