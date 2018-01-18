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
    localStorageProxy.set('lastOrganizationSlug', model.get('slug'));

    this.get('intercom').associateWithCompany(this.get('currentUser'), model);
  },
});
