import {computed} from '@ember/object';
import Component from '@ember/component';

export default Component.extend({
  selectedWidth: null,
  width: null,
  comparisons: [],

  classNames: ['ComparisonSwitcherItem'],
  updateSelectedWidth() {},
  classNameBindings: [
    'isSelected:ComparisonSwitcherItem--selected',
    'matchingComparison::ComparisonSwitcherItem--noComparison',
    'matchingComparison.isDifferent:ComparisonSwitcherItem--hasDiffs',
  ],
  matchingComparison: computed('comparsions', 'width', function() {
    let comparisons = this.get('comparisons') || [];
    return comparisons.findBy('width', this.get('width'));
  }),
  isSelected: computed('selectedWidth', 'width', function() {
    return parseInt(this.get('selectedWidth'), 10) === this.get('width');
  }),
  click() {
    this.get('updateSelectedWidth')(this.get('width'));
  },
});
