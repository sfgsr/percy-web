import Ember from 'ember';
import utils from '../lib/utils';
import UnauthenticatedRouteMixin from 'simple-auth/mixins/unauthenticated-route-mixin';

export default Ember.Route.extend(UnauthenticatedRouteMixin, {
  afterModel: function() {
    this.get('session').authenticate('authenticator:custom').then(function() {
      var finalRedirect = utils.getQueryParam('redirect_to');
      if (finalRedirect) {
        window.location.href = decodeURIComponent(finalRedirect);
      }
    });
  },
});
