import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  actions: {
    organizationUpdated(organization) {
      // If an organization slug changes, we prefer to reload the entire application
      // to prevent odd bugs, since we rely on the org slug for basically everything.
      let router = Ember.getOwner(this).lookup('router:main');
      let destinationUrl = router.generate('organization', organization.get('slug'));
      window.location.href = destinationUrl;
    },
  }
});
