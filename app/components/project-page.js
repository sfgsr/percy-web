import Component from '@ember/component';

export default Component.extend({
  isSidebarVisible: false,

  actions: {
    toggleSidebar() {
      this.toggleProperty('isSidebarVisible');
    },
  },
});
