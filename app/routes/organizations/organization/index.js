import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  redirect(model) {
    this.transitionTo('organization.index', model.get('slug'));
  },
});

