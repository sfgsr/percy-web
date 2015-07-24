import Ember from 'ember';
import ApplicationRouteMixin from 'simple-auth/mixins/application-route-mixin';

export default Ember.Route.extend(ApplicationRouteMixin, {
  actions: {
    enablingRepo: function(promise, repo) {
      promise.then(function() {
        repo.reload();
      });
    },
    disablingRepo: function(promise, repo) {
      promise.then(function() {
        repo.reload();
      });
    },

    disableRepo: function(repo) {
      this.send('disablingRepo', repo.disable(), repo);
    },
    enableRepo: function(repo) {
      this.send('enablingRepo', repo.enable(), repo);
    },
  },
});

