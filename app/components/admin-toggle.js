import Ember from 'ember';

export default Ember.Component.extend({
  isAdminEnabled: false,

  setup: Ember.on('init', function() {
    this.set('isAdminEnabled', localStorage.getItem('percyMode') == 'admin');
  }),

  actions: {
    toggleAdmin() {
      this.toggleProperty('isAdminEnabled');
      if (this.get('isAdminEnabled')) {
        localStorage.setItem('percyMode', 'admin');
      } else {
        localStorage.removeItem('percyMode');
      }
    }
  },
});
