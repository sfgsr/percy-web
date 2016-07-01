import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return this.modelFor('repo');
  },
  afterModel(repo) {
    repo.get('builds').reload(); // Load (or reload) builds async, not returned to avoid blocking.
  },
  actions: {
    refresh() {
      this.modelFor('repo.index').reload().then(function(repo) {
        repo.get('builds').reload();
      });
    },
  },
});