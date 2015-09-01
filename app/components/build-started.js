import Ember from 'ember';

export default Ember.Component.extend({
  build: null,
  classes: null,

  classNames: ['BuildStarted'],
  classNameBindings: [
    'classes',
  ],
});
