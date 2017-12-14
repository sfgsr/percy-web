import Component from '@ember/component';
import {computed} from '@ember/object';

export default Component.extend({
  identities: [], // todo initialize new array

  githubIdentity: computed('identities.@each.provider', function() {
    return this.get('identities').findBy('provider', 'github');
  }),
  emailPasswordIdentity: computed('identities.@each.provider', function() {
    return this.get('identities').findBy('provider', 'auth0');
  }),
});
