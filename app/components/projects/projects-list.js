import Ember from 'ember';

export default Ember.Component.extend({
  projects: null,

  classNames: [
    'ProjectsList',
  ],
  classNameBindings: [
    'classes',
  ],
});
