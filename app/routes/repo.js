import Ember from 'ember';
import AuthenticatedRouteMixin from 'simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  model: function(params) {
    return this.store.find('repo', this.modelFor('owner').id + '/' + params.repo_id);
  },
  afterModel: function(repo) {
    return repo.get('builds');
  }
});