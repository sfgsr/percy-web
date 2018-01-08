import Component from '@ember/component';

export default Component.extend({
  project: null,
  showQuickstart: false,
  tagName: 'main',
  classNameBindings: ['classes'],
  actions: {
    refresh() {
      this.set('isRefreshing', true);
      this.get('project')
        .reload()
        .then(project => {
          project
            .get('builds')
            .reload()
            .then(() => {
              this.set('isRefreshing', false);
            });
        });
    },
    showSupport() {
      this.sendAction('showSupport');
    },
  },
});
