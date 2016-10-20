import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  session: Ember.inject.service(),
  afterModel() {
    // Reload to get the latest subscription details, and return a promise so the load will wait.
    // TODO: #projectification. Kill this.
    return this.get('session.data.authenticated.user').reload();
  },
});