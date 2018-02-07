import {on} from '@ember/object/evented';
import Component from '@ember/component';
import AdminMode from 'percy-web/lib/admin-mode';

export default Component.extend({
  isAdminEnabled: false,

  setup: on('init', function() {
    this.set('isAdminEnabled', AdminMode.isAdmin());
  }),

  actions: {
    toggleAdmin() {
      this.toggleProperty('isAdminEnabled');

      if (this.get('isAdminEnabled')) {
        AdminMode.setAdminMode();
      } else {
        AdminMode.clear();
      }
    },
  },
});
