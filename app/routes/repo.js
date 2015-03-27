import Ember from 'ember';

export default Ember.Route.extend({
  model: function(params) {
    return this.store.find('repo', this.modelFor('owner').id + '/' + params.repo_id);
  },
});