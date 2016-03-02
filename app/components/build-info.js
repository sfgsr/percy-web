import Ember from 'ember';

export default Ember.Component.extend({
  build: null,
  showComparisonInfo: true,
  classes: null,

  classNames: ['BuildInfo'],
  classNameBindings: [
    'classes',
  ],
});
