import Ember from 'ember';
import DS from 'ember-data';

export default DS.Model.extend({
  login: DS.attr(),
  name: DS.attr(),
  email: DS.attr(),
  avatarUrl: DS.attr(),
  githubId: DS.attr(),
  lastSyncedAt: DS.attr('date'),
  lastPrivateSyncedAt: DS.attr('date'),

  // These endpoints are only available on the current user and should not be accessed otherwise.
  // Note: the {inverse: null} is important here to avoid the github-bot-user relation on
  // organizations from being auto filled-in by ember data.
  organizations: DS.hasMany('organizations', {inverse: null}),

  createdAt: DS.attr('date'),
  updatedAt: DS.attr('date'),

  githubUrl: Ember.computed('login', function() {
    return 'https://github.com/' + this.get('login');
  }),
});
