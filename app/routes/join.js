import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';


export default Ember.Route.extend(AuthenticatedRouteMixin, {
  model(params) {
    return this.store.findRecord('invite', params.invite_code);
  },
  actions: {
    inviteAccepted(model) {
      this.transitionTo('organizations.organization.index', model.get('organization.slug'));
    }
  }
});
