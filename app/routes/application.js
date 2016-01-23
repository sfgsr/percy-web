import Ember from 'ember';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';

export default Ember.Route.extend(ApplicationRouteMixin, {
  session: Ember.inject.service(),
  actions: {
    sessionRequiresAuthentication: function() {
      this.get('session').authenticate('authenticator:custom');
    },
    invalidateSession: function() {
      this.get('session').invalidate();
    },
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
            "You've hit the limit of 2 active repos on this plan.",
            "\nView plan upgrades?",
          ].join('');
          if (confirm(msg)) {
            self.transitionTo('account');
          }
        }
      });
      this.send('enablingRepo', promise, repo);
    },
    navigateToBuild: function(build) {
      this.transitionTo('builds.build', build);
    },
  },
});

