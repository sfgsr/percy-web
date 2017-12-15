import Route from '@ember/routing/route';
import EnsureStatefulLogin from 'percy-web/mixins/ensure-stateful-login';
import {inject as service} from '@ember/service';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import {alias} from '@ember/object/computed';

export default Route.extend(EnsureStatefulLogin, AuthenticatedRouteMixin, {
  session: service(),
  store: service(),
  currentUser: alias('session.currentUser'),

  model() {
    const x = this.get('currentUser.identities');

    return x;
  },

  setupController(controller, model) {
    controller.set('model', model);
  },

  actions: {
    showGithubLockModal() {
      this.showConnectToServiceModal('github');
    },
  },
});
