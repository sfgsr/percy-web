import {alias, empty} from '@ember/object/computed';
import Component from '@ember/component';

export default Component.extend({
  classNameBindings: ['isHidden:is-invisible'],
  wasAdded: alias('comparison.wasAdded'),
  isHidden: empty('comparison'),
  comparison: null,
  comparisonMode: null,

  updateComparionMode() {
    /* closure action */
  },
});
