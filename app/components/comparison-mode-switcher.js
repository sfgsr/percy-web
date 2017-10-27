import {alias, empty} from '@ember/object/computed';
import Component from '@ember/component';

export default Component.extend({
  classNames: ['ComparisonModeSwitcher'],
  classNameBindings: ['isHidden:ComparisonModeSwitcher--hidden'],
  wasAdded: alias('comparison.wasAdded'),
  isHidden: empty('comparison'),
  comparison: null,
  comparisonMode: null,
  updateComparionMode() {
    /* closure action */
  },
});
