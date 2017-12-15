import Component from '@ember/component';
import {computed} from '@ember/object';
import {inject as service} from '@ember/service';
import {lte, notEmpty} from '@ember/object/computed';

export default Component.extend({
  session: service(),
  store: service(),
  flashMessages: service(),
  identities: [], // todo initialize new array

  githubIdentity: computed('identities.@each.provider', function() {
    return this.get('identities').findBy('provider', 'github');
  }),
  emailPasswordIdentity: computed('identities.@each.provider', function() {
    return this.get('identities').findBy('provider', 'auth0');
  }),
  isAnyIdentities: notEmpty('identities'),
  isDisconnectIdentityDisabled: lte('identities.length', 1),
});
