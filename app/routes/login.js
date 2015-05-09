import Ember from 'ember';

export default Ember.Route.extend({
  afterModel: function() {
    this.get('session').authenticate('authenticator:custom', {doRedirect: false});
  },
});