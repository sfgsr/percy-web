import DS from 'ember-data';

export default DS.Model.extend({
  userHash: DS.attr(),
  login: DS.attr(),
  name: DS.attr(),
  email: DS.attr(),
  avatarUrl: DS.attr(),
  githubId: DS.attr(),
  githubUrl: DS.attr(),
  lastSyncedAt: DS.attr('date'),
  lastPrivateSyncedAt: DS.attr('date'),

  // These endpoints are only available on the current user and should not be accessed otherwise.
  organizations: DS.hasMany('organizations', {inverse: null}),

  createdAt: DS.attr('date'),
  updatedAt: DS.attr('date'),
});
