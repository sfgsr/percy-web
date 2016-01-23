import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  model: function(params) {
    var repoSlug = this.modelFor('namespace').get('id') + '/' + params.repo_id;
    return this.store.find('repo', repoSlug);
  },
  afterModel: function(repo) {
    return repo.get('builds');
  },
  actions: {
    error: function(error) {
      if (error.status === 403) {
        return this.transitionTo('repo-forbidden');
      }
    },
  },
});