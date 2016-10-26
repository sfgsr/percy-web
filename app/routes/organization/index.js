import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  redirect() {
    this.send('redirectToDefaultOrganization');
  },
  afterModel(model) {
    model.get('projects').reload();
  },
});

