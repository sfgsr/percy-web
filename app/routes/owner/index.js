import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
    return Ember.RSVP.hash({
      owner: this.modelFor('owner'),
      repos: this.store.find('repo'),
    });
  },
});