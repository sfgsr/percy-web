import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr(),
  slug: DS.attr(),
  githubIntegration: DS.belongsTo('github-integration', {async: false}),
  githubIntegrationRequest: DS.belongsTo('github-integration-request', {async: false}),

  projects: DS.hasMany('project'),
});
