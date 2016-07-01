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

  click: function() {
    this.send('selectNamespace', this.get('namespace'));
  },
  actions: {
    selectNamespace: function(namespace) {
      this.sendAction('selectNamespace', namespace);
    },
  }
});
