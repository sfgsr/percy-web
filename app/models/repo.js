import Ember from 'ember';
import DS from 'ember-data';
import utils from '../lib/utils';

export default DS.Model.extend({
  githubId: DS.attr('number'),
  name: DS.attr(),
  ownerLogin: DS.attr(),
  slug: DS.attr(),
  isPrivate: DS.attr('boolean'),
  isEnabled: DS.attr('boolean'),
  isDisabled: Ember.computed.not('isEnabled'),
  htmlUrl: DS.attr(),
  description: DS.attr(),
  createdAt: DS.attr('date'),
  updatedAt: DS.attr('date'),

  builds: DS.hasMany('build', {async: true}),
  tokens: DS.hasMany('token', {async: true}),

  writeOnlyToken: function() {
    // Write now the tokens API only returns a list of one write-only token.
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
