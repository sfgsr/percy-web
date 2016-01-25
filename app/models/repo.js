import Ember from 'ember';
import DS from 'ember-data';
import utils from '../lib/utils';

export default DS.Model.extend({
  githubId: DS.attr('number'),
  namespace: DS.belongsTo('namespace', {async: false}),
  name: DS.attr(),
  slug: DS.attr(),
  htmlUrl: DS.attr(),
  isPrivate: DS.attr('boolean'),
  isEnabled: DS.attr('boolean'),
  isDisabled: Ember.computed.not('isEnabled'),
  owner: DS.belongsTo('user', {async: false}),
  diffBase: DS.attr(),  // Either "automatic" or "manual".
  isAutomaticDiffBase: Ember.computed.equal('diffBase', 'automatic'),
  isManualDiffBase: Ember.computed.equal('diffBase', 'manual'),
  description: DS.attr(),
  createdAt: DS.attr('date'),
  updatedAt: DS.attr('date'),

  builds: DS.hasMany('build', {async: true}),
  tokens: DS.hasMany('token', {async: true}),

  session: Ember.inject.service(),
  isCurrentUserOwner: function() {
    if (this.get('isEnabled')) {
      // If there is a repo owner, check if it's the same as the current session's user.
      return this.get('session.data.authenticated.user.login') === this.get('owner.login');
    }
    return false;
  }.property('isEnabled', 'owner'),
  isNotCurrentUserOwner: Ember.computed.not('isCurrentUserOwner'),

  writeOnlyToken: function() {
    // Right now the tokens API only returns a list of one write-only token.
    return this.get('tokens.firstObject');
  }.property('tokens'),

  enable: function() {
    return Ember.$.ajax({
      type: 'POST',
      url: utils.buildApiUrl('enableRepo', this.get('id')),
    });
  },
  disable: function() {
    return Ember.$.ajax({
      type: 'POST',
      url: utils.buildApiUrl('disableRepo', this.get('id')),
    });
  },
});
