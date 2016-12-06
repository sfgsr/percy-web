import { Model, hasMany, belongsTo } from 'ember-cli-mirage';

export default Model.extend({
  organizationUsers: hasMany('organization-user'),
  projects: hasMany('projects'),
  githubBotUser: belongsTo('user'),
  subscription: belongsTo('subscription')
});
