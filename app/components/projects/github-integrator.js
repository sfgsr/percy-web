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
    chooseRepo(repo) {
      let project = this.get('project');
      project.set('repo', repo);
      project.save();
    }
  }
});
