import Component from '@ember/component';

export default Component.extend({
  build: null,
  showDiffs: null,
  toggleShowDiffs: null,

  classNames: ['BuildToolbar'],

  actions: {
    toggleOverlay() {
      this.get('toggleShowDiffs')({eventTrigger: 'clicked_toggle'});
    },
  },
});
