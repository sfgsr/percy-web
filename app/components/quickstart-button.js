import Component from '@ember/component';

export default Component.extend({
  classNames: ['QuickstartButton'],
  click() {
    this.toggleProperty('showQuickstart');
  },
});
