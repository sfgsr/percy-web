import Ember from 'ember';

export default Ember.Component.extend({
  organization: null,
  classes: null,

  currentIntegration: Ember.computed.alias('organization.githubIntegration'),
  classNames: ['OrganizationsGithubIntegration'],
  classNameBindings: [
    'classes',
  ],
  actions: {
    cancelIntegrationRequest() {
      this.sendAction('cancelIntegrationRequest');
    }
  }
});
