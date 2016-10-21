import Ember from 'ember';

export default Ember.Component.extend({
  project: null,
  classes: null,

  organization: Ember.computed.alias('project.organization'),

  classNames: ['ProjectsGithubIntegrator'],
  classNameBindings: [
    'classes',
  ],
  actions: {
    chooseRepo() {
    }
  }
});
