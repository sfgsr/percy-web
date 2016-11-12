import Ember from 'ember';
import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr(),
  slug: DS.attr(),
  githubBotUser: DS.belongsTo('user', {async: false, inverse: null}),
  githubIntegration: DS.belongsTo('github-integration', {async: false}),
  githubIntegrationRequest: DS.belongsTo('github-integration-request', {async: false}),

  subscription: DS.belongsTo('subscription'),
  projects: DS.hasMany('project'),

  // Filtered down to saved projects, does not include unsaved project objects:
  savedProjects: Ember.computed.filterBy('projects', 'isNew', false),

  organizationUsers: DS.hasMany('organization-user'),

  // These are GitHub repositories that the organization has access permissions to. These are not
  // useful on their own other than for listing. A repo must be linked to a project.
  repos: DS.hasMany('repo'),

  isGithubIntegrated: Ember.computed('githubAuthMechanism', function() {
    return this.get('githubAuthMechanism') !== 'no-access';
  }),
  githubAuthMechanism: Ember.computed('githubBotUser', 'githubIntegration', function() {
    if (this.get('githubBotUser')) {
      return 'github-bot-user';
    } else if (this.get('githubIntegration')) {
      return 'github-integration';
    }
    return 'no-access';
  }),

  // A funky, but efficient, way to query the API for only the current user's membership.
  // Use `organization.currentUserMembership` to get the current user's OrganizationUser object.
  currentUserMembership: Ember.computed.alias('_filteredOrganizationUsers.firstObject'),
  _filteredOrganizationUsers: Ember.computed(function() {
    return this.store.query('organization-user', {organization: this, filter: 'current-user-only'});
  }),
});
