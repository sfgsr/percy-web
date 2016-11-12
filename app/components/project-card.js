import Ember from 'ember';

export default Ember.Component.extend({
  project: null,

  classNames: [
    'ProjectCard',
  ],
  classNameBindings: [
    'classes',
    'project.isDisabled:ProjectCard--disabled',
  ],
});
