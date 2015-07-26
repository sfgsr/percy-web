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
      var self = this;
      var promise = repo.enable();
      promise.then(null, function(response) {
        if (response.status === 402) {
          var msg = [
            "Whoops! You've hit the limit of 2 private repos on the free plan.",
            "\n\nUpgrading is easy, would you like to see the available plans?",
          ].join('');
          if (confirm(msg)) {
            self.transitionTo('account');
          }
        }
      });
      this.send('enablingRepo', promise, repo);
    },
  },
});

