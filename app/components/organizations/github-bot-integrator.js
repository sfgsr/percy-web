import Ember from 'ember';

export default Ember.Component.extend({
  changeset: null,
  classes: null,
  selectionChanged: null,

  session: Ember.inject.service(),
  classNames: ['OrganizationsGithubBotIntegrator'],
  classNameBindings: [
    'classes',
  ],
  actions: {
    assignMe() {
      // We just delegate handling everything up to the github-settings component for ease.
      this.get('assignMe')();
    },
  }
});
