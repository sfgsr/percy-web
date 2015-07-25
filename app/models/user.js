import Ember from 'ember';
import DS from 'ember-data';

export default DS.Model.extend({
  login: DS.attr(),
  name: DS.attr(),
  email: DS.attr(),
  avatarUrl: DS.attr(),
  githubId: DS.attr(),
  isWhitelisted: DS.attr('boolean'),
  lastSyncedAt: DS.attr('date'),
  lastPrivateSyncedAt: DS.attr('date'),

  // This should only ever be accessed on the current user, because the API endpoint only returns
  // the subscription for the current user.
  subscription: DS.belongsTo('subscription'),

  createdAt: DS.attr('date'),
  updatedAt: DS.attr('date'),

  githubUrl: function() {
    return 'https://github.com/' + this.get('login');
  }.property('login'),
});
