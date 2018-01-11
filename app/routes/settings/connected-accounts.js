import Route from '@ember/routing/route';
import {inject as service} from '@ember/service';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import {alias} from '@ember/object/computed';
import EnsureStatefulLogin from 'percy-web/mixins/ensure-stateful-login';

export default Route.extend(AuthenticatedRouteMixin, EnsureStatefulLogin, {
  session: service(),
  store: service(),
  flashMessages: service(),
  currentUser: alias('session.currentUser'),

  model() {
    return this.get('currentUser.identities');
  },

  setupController(controller, model) {
    controller.set('model', model);
  },

  actions: {
    addIdentity(providerName) {
      if (providerName === 'auth0') {
        providerName = 'Username-Password-Authentication';
      }
      this.showConnectToServiceModal(providerName);
    },
    deleteIdentity(identityId) {
      const identity = this.get('store').peekRecord('identity', identityId);

      let identityProvider = identity.get('provider');
      if (identityProvider === 'auth0') {
        identityProvider = 'Email/Password';
      }

      let confirmation = confirm(
        `Are you sure you want to disconnect your ${identityProvider} account?`,
      );
      if (!confirmation) {
        return;
      }

      identity
        .destroyRecord()
        .then(() => {
          this.get('flashMessages').success(
            `Your ${identityProvider} account has been disconnected from Percy`,
          );
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
