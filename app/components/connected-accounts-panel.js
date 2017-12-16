import Component from '@ember/component';
import {computed} from '@ember/object';
import {inject as service} from '@ember/service';
import {gt, notEmpty} from '@ember/object/computed';

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
  isDisconnectIdentityEnabled: gt('identities.length', 1),
});
