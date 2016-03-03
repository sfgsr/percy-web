import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
    return this.modelFor('repo');
  },
  afterModel: function(repo) {
    repo.get('builds'); // Load builds async, not returned and blocking.
  },
  actions: {
    refresh: function() {
      let repo = this.modelFor('repo.index')
      repo.reload().then(function(repo) {
        repo.get('builds').reload();
      });
    },
  },
});