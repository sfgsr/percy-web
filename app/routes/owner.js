import Ember from 'ember';
import AuthenticatedRouteMixin from 'simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  model: function(params) {
    return Ember.Object.create({login: params.owner_id});
  },
  actions: {
    togglingRepo: function(promise, repo) {
      promise.then(function() {
        repo.reload();
      });
    },
  },
});