import Ember from 'ember';

export default Ember.Route.extend({
  model: function(params) {
    // TODO(fotinakis): we need this crazy stuff because the API endpoint is the collection
    // with filters, so multiple objects are returned but we want the model to be singular.
    // Need to figure out a much better way to deal with URLs with slashes.
    var self = this;
    var promise = new Ember.RSVP.Promise(function(resolve, reject) {
      var repoParams = {repo: params.repo_id, owner: self.modelFor('owner').id};
      self.store.find('repo', repoParams).then(
        function(repos) {
          resolve(repos.content[0]);
        },
        function() {
          reject.apply(this, arguments);
        });
    });
    return promise;
  },
});