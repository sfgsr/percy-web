import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Route.extend(AuthenticatedRouteMixin, {
  redirect(model) {
    this.transitionTo('organization.index', model.get('slug'));
  },
});
