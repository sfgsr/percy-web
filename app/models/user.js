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

  // These endpoints are only available on the current user and should not be accessed otherwise:
  organizations: DS.hasMany('organizations'),
  subscription: DS.belongsTo('subscription', {async: false}),

  createdAt: DS.attr('date'),
  updatedAt: DS.attr('date'),

  githubUrl: Ember.computed('login', function() {
    return 'https://github.com/' + this.get('login');
  }),
});
