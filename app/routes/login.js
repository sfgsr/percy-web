import Ember from 'ember';
import utils from '../lib/utils';

export default Ember.Route.extend({
  afterModel: function() {
    this.get('session').authenticate('authenticator:custom').then(function() {
      var finalRedirect = utils.getQueryParam('redirect_to');
      if (finalRedirect) {
        window.location.href = decodeURIComponent(finalRedirect);
      }
    });
  },
});
