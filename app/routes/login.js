import Ember from 'ember';
import utils from '../lib/utils';
import UnauthenticatedRouteMixin from 'ember-simple-auth/mixins/unauthenticated-route-mixin';

export default Ember.Route.extend(UnauthenticatedRouteMixin, {
  session: Ember.inject.service(),

  afterModel: function() {
    // Right now location.href is the URL before the transition to the login route has completed.
    // Make sure to pass redirectTo into the authenticator so that we come back to that URL.
    let options = {redirectTo: window.location.href};
    this.get('session').authenticate('authenticator:custom', options).then(
      function() {
        var finalRedirect = utils.getQueryParam('redirect_to');
        if (finalRedirect) {
          window.location.href = decodeURIComponent(finalRedirect);
        }
      }
    );
  },
});
