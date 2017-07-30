import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['ComparisonModeSwitcher'],
  classNameBindings: ['isHidden:ComparisonModeSwitcher--hidden'],
  wasAdded: Ember.computed.alias('comparison.wasAdded'),
  isHidden: Ember.computed.empty('comparison'),
  comparison: null,
  comparisonMode: null,
  updateComparionMode() {
    /* closure action */
  },
});
