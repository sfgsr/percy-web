import Ember from 'ember';

export default Ember.Component.extend({
  project: null,
  classes: null,

  classNames: ['ProjectsEnabledToggle'],
  classNameBindings: ['classes'],
  actions: {
    enable() {
      let project = this.get('project');
      project.set('isEnabled', true);
      project.save();
    },
    disable() {
      let project = this.get('project');
      project.set('isEnabled', false);
      project.save();
    },
  },
});
