import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr(),
  slug: DS.attr(),
  githubIntegration: DS.belongsTo('github-integration', {async: false}),
  githubIntegrationRequest: DS.belongsTo('github-integration-request', {async: false}),

  projects: DS.hasMany('project'),

  // These are GitHub repositories that the integration has access to. To be useful, a repo
  // has to be linked to a project.
  repos: DS.hasMany('repo'),

  isGithubIntegrated: Ember.computed.bool('githubIntegration'),
});
