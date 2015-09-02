import Ember from 'ember';

export default Ember.Component.extend({
  build: null,
  classes: null,

  classNames: ['BuildComparisonInfo'],
  classNameBindings: [
    'classes',
  ],
});
