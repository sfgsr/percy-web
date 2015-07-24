import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
    return Ember.RSVP.hash({
      owner: this.modelFor('owner'),
      repos: this.store.find('repo', {'filter[owner-login]': this.modelFor('owner').get('login')}),
    });
  },
  actions: {
    selectOwner: function(owner) {
      this.transitionTo('owner.index', owner.login);
    },
  },
});