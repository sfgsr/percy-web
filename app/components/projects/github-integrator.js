import Ember from 'ember';

export default Ember.Component.extend({
  project: null,
  classes: null,

  isSaving: null,
  isSaveSuccessful: null,

  organization: Ember.computed.alias('project.organization'),

  triggerSavingIndicator(promise) {
    this.set('isSaveSuccessful', null);
    this.set('isSaving', true);
    promise.then(() => {
      this.set('isSaving', false);
      this.set('isSaveSuccessful', true);
    }, () => {
      this.set('isSaveSuccessful', false);
    })
  },

  classNames: ['ProjectsGithubIntegrator'],
  classNameBindings: [
    'classes',
  ],
  actions: {
    chooseRepo(repo) {
      let project = this.get('project');
      project.set('repo', repo);
      this.triggerSavingIndicator(project.save());
    },
  }
});
