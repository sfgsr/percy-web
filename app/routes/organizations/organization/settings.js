import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  actions: {
    organizationUpdated(organization) {
      // If organization slug changed, redirect to new URL slug:
      this.transitionTo('organization', organization.get('slug'));
    },
  }
});
