import Ember from 'ember';

export default Ember.Component.extend({
  project: null,
  showQuickstart: false,
  classNames: ['ProjectContainer'],
  classNameBindings: ['classes'],
  actions: {
    refresh() {
      this.set('isRefreshing', true);
      this.get('project').reload().then(project => {
        project.get('builds').reload().then(() => {
          this.set('isRefreshing', false);
        });
      });
    },
    showSupport() {
      this.sendAction('showSupport');
    },
  },
});
