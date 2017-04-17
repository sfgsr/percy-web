import {Model, hasMany, belongsTo} from 'ember-cli-mirage';

export default Model.extend({
  organizationUsers: hasMany('organization-user'),
  projects: hasMany('project'),
  githubBotUser: belongsTo('user'),
  githubIntegration: belongsTo('github-integration'),
  subscription: belongsTo('subscription')
});
