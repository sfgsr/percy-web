import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
    return Ember.RSVP.hash({
      currentNamespace: this.modelFor('namespace'),
      namespaces: this.store.find('namespace'),
      repos: this.store.find('repo', {'filter[namespace]': this.modelFor('namespace').get('id')}),
    });
  },
  actions: {
    selectNamespace: function(namespace) {
      this.transitionTo('namespace.index', namespace.get('id'));
    },
  },
});