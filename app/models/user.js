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
  plan: DS.attr(),
  planName: DS.attr(),
  createdAt: DS.attr('date'),
  updatedAt: DS.attr('date'),

  hasFreeSubscription: Ember.computed.equal('plan', 'free-2'),
  hasPaidSubscription: Ember.computed.not('hasFreeSubscription'),

  githubUrl: function() {
    return 'https://github.com/' + this.get('login');
  }.property('login'),
});
