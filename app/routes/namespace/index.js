import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return Ember.RSVP.hash({
      currentNamespace: this.modelFor('namespace'),
      namespaces: this.store.findAll('namespace'),
      repos: this.store.query('repo', {'filter[namespace]': this.modelFor('namespace').get('id')}),
    });
  },
  actions: {
    selectNamespace(namespace) {
      this.transitionTo('namespace.index', namespace.get('id'));
    },
  },
});