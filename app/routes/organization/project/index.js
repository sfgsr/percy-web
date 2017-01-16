import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import ResetScrollMixin from 'percy-web/mixins/reset-scroll';

export default Ember.Route.extend(AuthenticatedRouteMixin, ResetScrollMixin, {
  actions: {
    didTransition() {
      let project = this.modelFor(this.routeName);
      let organization = project.get('organization');
      let eventProperties = {
        project_id: project.get('id'),
        project_slug: project.get('slug'),
      };
      this.analytics.track('Project Viewed', organization, eventProperties);
    },
  },
});
