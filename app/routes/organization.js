import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  afterModel(model) {
    try {
      localStorage.setItem('lastOrganizationSlug', model.get('slug'));
    } catch (_) {
      // Do not care about Safari in private mode.
    }
  },
});
