import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import ResetScrollMixin from 'percy-web/mixins/reset-scroll';

export default Route.extend(AuthenticatedRouteMixin, ResetScrollMixin, {
  actions: {
    didTransition() {
      this._super.apply(this, arguments);

      let project = this.modelFor(this.routeName);
      let organization = project.get('organization');
      let eventProperties = {
        project_id: project.get('id'),
        project_slug: project.get('slug'),
      };
      this.analytics.track('Project Viewed', organization, eventProperties);

      // If transitioning back to this page after first load, background reload the builds.
      if (project.get('builds').isFulfilled) {
        project.get('builds').reload();
      }
    },
  },
});
