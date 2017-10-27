import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Route.extend(AuthenticatedRouteMixin, {
  actions: {
    projectCreated(project) {
      let organizationSlug = project.get('organization.slug');
      let projectSlug = project.get('slug');
      this.transitionTo('organization.project.index', organizationSlug, projectSlug);
    },
  },
});
