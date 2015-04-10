import Ember from 'ember';

export default Ember.Route.extend({
  beforeModel: function() {
    if (sessionStorage.getItem('user_token')) {
      this.transitionTo('repo.index');
    }
  },
});