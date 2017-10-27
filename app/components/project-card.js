import Component from '@ember/component';

export default Component.extend({
  project: null,

  classNames: ['ProjectCard'],
  classNameBindings: ['classes', 'project.isDisabled:ProjectCard--disabled'],
});
