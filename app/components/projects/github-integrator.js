import Ember from 'ember';
import config from 'percy-web/config/environment';

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
      debugger;
    }
  }
});
