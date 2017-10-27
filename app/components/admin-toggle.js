import {on} from '@ember/object/evented';
import {inject as service} from '@ember/service';
import Component from '@ember/component';

export default Component.extend({
  isAdminEnabled: false,
  adminMode: service(),

  setup: on('init', function() {
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
