import Ember from 'ember';
import ApplicationRouteMixin from 'simple-auth/mixins/application-route-mixin';

export default Ember.Route.extend(ApplicationRouteMixin, {
  activate: function(key, target, method) {
    // If the hash contains '#auth', start the auth flow without redirects.
    if (window.location.hash.indexOf('#auth') != -1) {
      this.get('session').authenticate('authenticator:custom', {doRedirect: false});
      if (window.history && window.history.pushState) {
        window.history.pushState('', document.title, window.location.pathname);
      }
    }
  },
});

