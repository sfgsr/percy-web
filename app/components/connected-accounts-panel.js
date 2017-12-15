import Component from '@ember/component';
import {computed} from '@ember/object';
import {inject as service} from '@ember/service';
import EnsureStatefulLogin from 'percy-web/mixins/ensure-stateful-login';
import $ from 'jquery';

export default Component.extend(EnsureStatefulLogin, {
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

  isDisconnectIdentityDisabled: computed.lte('identities.length', 1),

  actions: {
    addService(providerName) {
      if (providerName === 'auth0') {
        providerName = 'Username-Password-Authentication';
      }
      this.showConnectToServiceModal(providerName);
    },

    disconnectIdentity(identityId) {
      // todo make this a route action
      // Todo make this less terrible
      return $.ajax({
        type: 'DELETE',
        url: `/api/v1/users/${this.get('session.currentUser.id')}/identities/${identityId}`,
      })
        .then(() => {
          this.get('store')
            .peekAll('identity')
            .findBy('id', identityId)
            .unloadRecord();
        })
        .catch(() => {
          this.get('flashMessages').danger(
            'There was a problem disconnecting your account.' +
              ' Please try again or contact customer support.',
          );
        });
    },
  },
});
