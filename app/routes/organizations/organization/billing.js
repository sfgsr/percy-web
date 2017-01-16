import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  actions: {
    didTransition() {
      let organization = this.modelFor(this.routeName);
      this.analytics.track('Billing Viewed', organization);
    },
  }
});
