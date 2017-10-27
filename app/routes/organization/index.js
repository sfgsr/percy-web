import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Route.extend(AuthenticatedRouteMixin, {
  redirect() {
    this.send('redirectToDefaultOrganization');
  },
  afterModel(model) {
    model.get('projects').reload();
  },
  actions: {
    didTransition() {
      this._super.apply(this, arguments);

      let organization = this.modelFor(this.routeName);
      this.analytics.track('Dashboard Viewed', organization);
    },
  },
});
