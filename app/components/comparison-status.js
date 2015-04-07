import Ember from 'ember';

export default Ember.Component.extend({
  comparison: null,
  classes: null,

  classNames: ['ComparisonStatus'],
  classNameBindings: [
    'classes',
    'comparison.isDifferent:ComparisonStatus--isDifferent'
  ],
});
