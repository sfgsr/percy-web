import Route from '@ember/routing/route';
import {inject as service} from '@ember/service';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import {alias} from '@ember/object/computed';

export default Route.extend(AuthenticatedRouteMixin, {
  session: service(),
  store: service(),
  currentUser: alias('session.currentUser'),

  model() {
    return this.get('currentUser.identities');
  },

  setupController(controller, model) {
    controller.set('model', model);
  },
});
