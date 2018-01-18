import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import ResetScrollMixin from 'percy-web/mixins/reset-scroll';
import {hash} from 'rsvp';

export default Route.extend(AuthenticatedRouteMixin, ResetScrollMixin, {
  model() {
    let project = this.modelFor('organization.project');
    return project.get('organization.projects').then(projects => {
      return hash({
        project: project,
        sortedProjects: projects.sortBy('isDisabled', 'name'),
      });
    });
  },

  actions: {
    didTransition() {
      this._super.apply(this, arguments);

      let project = this.modelFor(this.routeName).project;
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
