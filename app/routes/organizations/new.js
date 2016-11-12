import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  actions: {
    organizationCreated(organization) {
      this.transitionTo('organizations.organization.setup', organization.get('slug'));
    },
  }
});
