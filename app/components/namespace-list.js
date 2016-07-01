import Ember from 'ember';

export default Ember.Component.extend({
  namespaces: null,
  currentNamespace: null,
  classes: null,

  session: Ember.inject.service(),
  classNames: ['NamespaceList'],
  classNameBindings: ['classes'],

  sortedNamespaces: Ember.computed('namespaces', 'currentNamespace', function() {
    var result = this.get('namespaces').toArray().sort(function(first, second) {
      // Always sort current user's org to the top.
      if (first.get('id') === this.get('session.data.authenticated.user.login')) {
        return -1;
      }
      // Sort everything else alphabetically.
      return (first.get('id') > second.get('id')) ? 1 : -1;
    }.bind(this));
    return result;
  }),

  actions: {
    selectNamespace(namespace) {
      this.sendAction('selectNamespace', namespace);
    },
  }
});
