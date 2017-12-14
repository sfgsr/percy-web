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
    // TODO REMOVE
    const githubIdentity = this.get('store').createRecord('identity', {
      id: Math.random(),
      user: this.get('session.currentUser'),
      provider: 'github',
      uid: '1239023',
    });
    const auth0Identity = this.get('store').createRecord('identity', {
      id: Math.random(),
      user: this.get('session.currentUser'),
      provider: 'auth0',
      uid: '1239023',
    });
    // debugger;
    return [githubIdentity, auth0Identity];
    // return hash({
    //   identities: [identity],
    //   // organizations: this.get('currentUser.organizations')
    // });
    // // return this.get('store').query('identity', {filter: {
    // //   // user: this.get('session.currentUser')
    // // }});
  },

  setupController(controller, model) {
    controller.set('model', model);
    // controller.set(
    //   'hasGithubConnection',
    //   model.filterBy('provider', 'github').length > 0,
    // );
    // controller.set('organizations', model.organizations);
    // controller.set('defaultOrgSlug', this._defaultOrgSlug());
  },

  // _defaultOrgSlug() {
  //   return localStorageProxy.get('lastOrganizationSlug') ||
  //     this.get('session.currentUser.organizations.firstObject.slug');
  // },

  actions: {
    showGithubLockModal() {
      this.showConnectToServiceModal('github');
    },
  },
});
