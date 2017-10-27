import {inject as service} from '@ember/service';
import {alias} from '@ember/object/computed';
import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Route.extend(AuthenticatedRouteMixin, {
  currentUser: alias('session.data.authenticated.user'),
  intercom: service(),

  afterModel(model) {
    try {
      localStorage.setItem('lastOrganizationSlug', model.get('slug'));
    } catch (_) {
      // Safari throws errors while accessing localStorage in private mode.
    }

    this.get('intercom').associateWithCompany(this.get('currentUser'), model);
  },
});
