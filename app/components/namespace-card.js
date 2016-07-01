import Ember from 'ember';

export default Ember.Component.extend({
  namespace: null,
  currentNamespace: null,
  classes: null,

  classNames: ['NamespaceCard', 'NamespaceCard--linked'],
  classNameBindings: ['classes', 'isActive:NamespaceCard--active'],
  isActive: Ember.computed('namespace.id', 'currentNamespace.id', function() {
    return this.get('namespace.id') === this.get('currentNamespace.id');
  }),

  click() {
    this.send('selectNamespace', this.get('namespace'));
  },
  actions: {
    selectNamespace(namespace) {
      this.sendAction('selectNamespace', namespace);
    },
  }
});
