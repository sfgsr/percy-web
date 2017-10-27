import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Route.extend(AuthenticatedRouteMixin, {
  redirect() {
    let organizationSlug = this.modelFor('organization').get('slug');
    let projectSlug = this.modelFor('organization.project').get('slug');
    this.transitionTo('organization.project.index', organizationSlug, projectSlug);
  },
});
