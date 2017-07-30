import Ember from 'ember';

export default Ember.Component.extend({
  isAdminEnabled: false,
  adminMode: Ember.inject.service(),

  setup: Ember.on('init', function() {
    this.set('isAdminEnabled', this.get('adminMode').get() == 'admin');
  }),

  actions: {
    toggleAdmin() {
      this.toggleProperty('isAdminEnabled');

      if (this.get('isAdminEnabled')) {
        this.get('adminMode').set('admin');
      } else {
        this.get('adminMode').clear();
      }
    },
  },
});
