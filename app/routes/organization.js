import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  currentUser: Ember.computed.alias('session.data.authenticated.user'),

  afterModel(model) {
    try {
      localStorage.setItem('lastOrganizationSlug', model.get('slug'));
    } catch (_) {
      // Safari throws errors while accessing localStorage in private mode.
    }

    let userId = this.get('currentUser.id');
    if (userId && window.Intercom) {
      window.Intercom('update', {
        user_id: userId,
        company: {
          id: model.get('id'),
        },
      });
    }
  },
});
