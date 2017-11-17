import {inject as service} from '@ember/service';
import {alias} from '@ember/object/computed';
import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import localStorageProxy from 'percy-web/lib/localstorage';

export default Route.extend(AuthenticatedRouteMixin, {
  intercom: service(),
  session: service(),
  currentUser: alias('session.currentUser'),

  afterModel(model) {
    try {
      localStorageProxy.set('lastOrganizationSlug', model.get('slug'));
    } catch (_) {
      // Safari throws errors while accessing localStorage in private mode.
    }

    this.get('intercom').associateWithCompany(this.get('currentUser'), model);
  },
});
