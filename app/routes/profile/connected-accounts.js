import Route from '@ember/routing/route';
import {inject as service} from '@ember/service';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import {alias} from '@ember/object/computed';
import EnsureStatefulLogin from 'percy-web/mixins/ensure-stateful-login';

export default Route.extend(AuthenticatedRouteMixin, EnsureStatefulLogin, {
  session: service(),
  store: service(),
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
      this.get('store')
        .peekRecord('identity', identityId)
        .destroyRecord()
        .catch(() => {
          this.get('flashMessages').danger(
            'There was a problem disconnecting your account.' +
              ' Please try again or contact customer support.',
          );
        });
    },
  },
});
